// Example circuit for zero-knowledge usage proof
pragma circom 2.0.0;

template UsageProof() {
    // Private inputs
    signal input contentId;
    signal input usageCount;
    signal input platformSecret;
    
    // Public inputs
    signal output commitment;
    
    // Verify the platform knows the secret and usage count
    // without revealing them
    commitment <== contentId + usageCount * platformSecret;
}

component main = UsageProof();