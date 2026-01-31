
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

const branches = branchesStr.split('\n').filter(b => b && b !== 'main' && b !== 'master' && !b.startsWith('*'));

console.log(`Found ${branches.length} branches to merge.`);

branches.forEach((branch, index) => {
    // Sanitize branch name
    const branchName = branch.trim();
    console.log(`[${index + 1}/${branches.length}] Merging ${branchName}...`);

    // Checkout main first
    run('git checkout main');

    // Merge
    try {
        execSync(`git merge ${branchName} --no-ff -m "merge: integrate ${branchName}"`, { stdio: 'inherit' });
    } catch (e) {
        console.log(`Merge conflict/error on ${branchName}. Aborting and force deleting.`);
        try { execSync('git merge --abort'); } catch (ex) { }
    }

    // Delete branch
    try {
        execSync(`git branch -D ${branchName}`);
    } catch (e) { }
});

console.log('--- Cleanup Completed ---');
try { execSync('git push origin main'); } catch (e) { }
