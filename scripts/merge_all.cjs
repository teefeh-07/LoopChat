const { execSync } = require('child_process');

function run(cmd) {
    try {
        // console.log(`Running: ${cmd}`);
        return execSync(cmd, { encoding: 'utf8' }).trim();
    } catch (e) {
        // console.error(`Failed: ${cmd}`);
        return null;
    }
}

console.log('--- Starting Branch Cleanup & Merge ---');

// Get all local branches
const branchesStr = run('git branch --format="%(refname:short)"');
if (!branchesStr) {
    console.log('No branches found?');
    process.exit(0);
}

const branches = branchesStr.split('\n').filter(b => b && b !== 'main' && b !== 'master');

console.log(`Found ${branches.length} branches to merge.`);

branches.forEach((branch, index) => {
    console.log(`[${index + 1}/${branches.length}] Merging ${branch}...`);

    // Checkout main first
    run('git checkout main');

    // Merge
    const mergeResult = run(`git merge ${branch} --no-ff -m "merge: integrate ${branch} features"`);

    // If merge failed (conflict), we abort and forced delete (simulating "wip" abandon) or try to resolve
    // For this context, simplistic "ours" strategy or abort is safest to keep main clean.
    if (!mergeResult) {
        console.log(`Merge conflict or error on ${branch}. Aborting merge and deleting branch.`);
        run('git merge --abort');
    }

    // Delete branch
    run(`git branch -D ${branch}`);
});

console.log('--- Cleanup Completed ---');
run('git push origin main');
