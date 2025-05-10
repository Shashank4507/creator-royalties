export const ROYALTY_TEMPLATES = {
    STANDARD: {
      name: "Standard License",
      description: "Basic royalty agreement with fixed percentage",
      model: "PERCENTAGE",
      parameters: {
        percentage: 5 // 5%
      }
    },
    COMMERCIAL: {
      name: "Commercial License",
      description: "Higher royalty for commercial use",
      model: "PERCENTAGE",
      parameters: {
        percentage: 10 // 10%
      }
    },
    TIERED: {
      name: "Tiered License",
      description: "Royalty increases with usage volume",
      model: "TIERED",
      parameters: {
        tiers: [100, 1000, 10000], // Usage thresholds
        rates: [500, 750, 1000] // 5%, 7.5%, 10% in basis points
      }
    },
    FIXED: {
      name: "Fixed Fee License",
      description: "Fixed fee per use regardless of sale price",
      model: "FIXED",
      parameters: {
        amount: 10000000000000000 // 0.01 ETH in wei
      }
    }
  };
  
  export const getTemplate = (templateName) => {
    return ROYALTY_TEMPLATES[templateName] || ROYALTY_TEMPLATES.STANDARD;
  };