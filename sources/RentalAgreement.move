module rental::RentalAgreement {
    use std::signer;

    // Rental Agreement Structure
    struct RentalData has store, key, drop {
        renter: address,
        rent_amount: u64,
        deposit: u64,   
        active: bool,
        penalties: u64,
    }

    

    // Create a new rental agreement
    public entry fun create_rental(account: &signer, rent_amount: u64, deposit: u64) {
        let addr = signer::address_of(account);
        let data = RentalData {
            renter: addr,
            rent_amount,
            deposit,
            active: true,
            penalties: 0,
        };
        move_to(account, data);
    }

    // Complete the rental and process refund
    public entry fun complete_rental(account: &signer) acquires RentalData {
        let data = move_from<RentalData>(signer::address_of(account));
        assert!(data.active, 100);
        let _ = data.deposit - data.penalties; // Calculate but don't store refund
        data.active = false;
        move_to(account, data);
    }

    // Cancel the rental and refund
    public entry fun cancel_rental(account: &signer) acquires RentalData {
        let data = move_from<RentalData>(signer::address_of(account));
        assert!(data.active, 100);
        data.active = false;
        move_to(account, data);
    }

    // Add a penalty for late return or damage
    public entry fun add_penalty(account: &signer, penalty_amount: u64) acquires RentalData {
        let data = move_from<RentalData>(signer::address_of(account));
        data.penalties = data.penalties + penalty_amount;
        move_to(account, data);
    }
}
