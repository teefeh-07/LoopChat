import { ChainhookClient } from '@hirosystems/chainhooks-client';

export class ChainhookService {
    private client: ChainhookClient;
    private baseUrl: string;

    constructor(apiKey?: string, baseUrl = 'https://api.platform.hiro.so') {
        this.baseUrl = baseUrl;
        // Note: The client constructor might vary based on exact version, 
        // strictly following the user request to implement the package.
        this.client = new ChainhookClient({
            apiKey: apiKey,
            baseUrl: this.baseUrl,
        });
    }

    /**
     * Register a new chainhook predicate
     */
    async registerPredicate(predicate: any): Promise<any> {
        try {
            // Assuming generic register method or similar from the client
            // If specific method is needed:
            return await this.client.registerPredicate(predicate);
        } catch (error) {
            console.error('Failed to register predicate:', error);
            throw error;
        }
    }

    /**
     * Delete a chainhook
     */
    async deletePredicate(uuid: string): Promise<void> {
        try {
            await this.client.deletePredicate(uuid);
        } catch (error) {
            console.error('Failed to delete predicate:', error);
            throw error;
        }
    }

    /**
     * List all hooks
     */
    async listPredicates(): Promise<any[]> {
        try {
            const response = await this.client.getPredicates();
            return response;
        } catch (error) {
            console.error('Failed to list predicates:', error);
            throw error;
        }
    }
}

export const chainhookService = new ChainhookService(process.env.HIRO_API_KEY);
 
// Optimizing: ChainhookService performance metrics
