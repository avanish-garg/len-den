module rental::Insurance {
    use std::signer;

    struct InsurancePolicy has store, key {
        owner: address,
        coverage: u64,
        active: bool,
    }

    // Purchase insurance for a rental item
    public entry fun purchase_insurance(account: &signer, coverage: u64) {
        let policy = InsurancePolicy {
            owner: signer::address_of(account),
            coverage,
            active: true,
        };
        move_to(account, policy);
    }

    // Claim insurance if needed
    public entry fun claim_insurance(account: &signer) acquires InsurancePolicy {
        let policy = move_from<InsurancePolicy>(signer::address_of(account));
        assert!(policy.active, 100);
        policy.active = false;
        move_to(account, policy);
    }
}
