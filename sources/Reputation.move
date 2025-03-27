module rental::Reputation {
    use std::signer;

    struct ReputationScore has store, key {
        renter: address,
        score: u64,
    }

    // Create a reputation record
    public entry fun create_reputation(account: &signer) {
        let addr = signer::address_of(account);
        let score = ReputationScore { renter: addr, score: 0 };
        move_to(account, score);
    }

    // Update reputation score (increment by 1 or any number)
    public entry fun update_reputation(account: &signer, increment: u64) acquires ReputationScore {
        let score = move_from<ReputationScore>(signer::address_of(account));
        score.score = score.score + increment;
        move_to(account, score);
    }
}
