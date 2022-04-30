export interface FundStorage {
    id: number;
    name: string;
    balance: number;
    type: "bank" | "wallet";
}