// This function calculates estimated tax liability based on investment data

Deno.serve(async (req) => {
  try {
    const { 
      income, 
      longTermGains, 
      shortTermGains, 
      dividends, 
      filingStatus, 
      taxYear 
    } = await req.json();
    
    // In a real implementation, this would apply actual tax rules
    // For demo purposes, we'll use simplified calculations
    
    // Simple tax brackets (2023 rates for single filers)
    const incomeTaxBrackets = [
      { rate: 0.10, threshold: 0 },
      { rate: 0.12, threshold: 11000 },
      { rate: 0.22, threshold: 44725 },
      { rate: 0.24, threshold: 95375 },
      { rate: 0.32, threshold: 182100 },
      { rate: 0.35, threshold: 231250 },
      { rate: 0.37, threshold: 578125 }
    ];
    
    // Long-term capital gains rates (2023)
    const ltcgRates = [
      { rate: 0.00, threshold: 0 },
      { rate: 0.15, threshold: 44625 },
      { rate: 0.20, threshold: 492300 }
    ];
    
    // Calculate income tax (simplified)
    let incomeTax = 0;
    let remainingIncome = income;
    
    for (let i = incomeTaxBrackets.length - 1; i >= 0; i--) {
      const bracket = incomeTaxBrackets[i];
      const prevThreshold = i > 0 ? incomeTaxBrackets[i-1].threshold : 0;
      
      if (income > bracket.threshold) {
        const taxableInThisBracket = Math.min(remainingIncome, income - bracket.threshold);
        incomeTax += taxableInThisBracket * bracket.rate;
        remainingIncome -= taxableInThisBracket;
      }
    }
    
    // Calculate long-term capital gains tax (simplified)
    let ltcgTax = 0;
    let applicableRate = 0.15; // Default rate
    
    for (let i = ltcgRates.length - 1; i >= 0; i--) {
      if (income > ltcgRates[i].threshold) {
        applicableRate = ltcgRates[i].rate;
        break;
      }
    }
    
    ltcgTax = longTermGains * applicableRate;
    
    // Short-term gains are taxed as ordinary income
    const stcgTax = shortTermGains * 0.24; // Simplified - would use brackets in real implementation
    
    // Dividend tax (simplified)
    const dividendTax = dividends * 0.15; // Qualified dividend rate
    
    // Total tax
    const totalTax = incomeTax + ltcgTax + stcgTax + dividendTax;
    const effectiveRate = totalTax / (income + longTermGains + shortTermGains + dividends);
    
    const result = {
      taxYear: taxYear || new Date().getFullYear(),
      filingStatus: filingStatus || "single",
      calculations: {
        incomeTax,
        longTermCapitalGainsTax: ltcgTax,
        shortTermCapitalGainsTax: stcgTax,
        dividendTax,
        totalTaxLiability: totalTax,
        effectiveTaxRate: effectiveRate,
        marginalTaxBracket: "24%" // Simplified
      },
      breakdown: {
        ordinaryIncome: income,
        longTermGains,
        shortTermGains,
        dividendIncome: dividends,
        totalTaxableIncome: income + longTermGains + shortTermGains + dividends
      },
      quarterlyEstimates: {
        q1: Math.round(totalTax * 0.25),
        q2: Math.round(totalTax * 0.25),
        q3: Math.round(totalTax * 0.25),
        q4: Math.round(totalTax * 0.25)
      }
    };

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});