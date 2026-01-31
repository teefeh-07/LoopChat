/**
 * Component Prop Type Definitions
 */

export interface NavigationProps {}

export interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export interface StrategyDashboardProps {
  walletAddress?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
 
// Docs: updated API reference for components

 
// Internal: verified component logic for components

