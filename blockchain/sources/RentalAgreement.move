module {{address}}::RentalAgreement {
    use std::signer;

    struct RentalData has key {
        renter: address,
        rent_amount: u64,
        deposit: u64,
        active: bool,
    }

    public entry fun create_rental(account: &signer, rent_amount: u64, deposit: u64) {
        let addr = signer::address_of(account);
        let data = RentalData {
            renter: addr,
            rent_amount,
            deposit,
            active: true,
        };
        move_to(account, data);
    }

    public entry fun complete_rental(account: &signer) {
        let data = move_from<RentalData>(signer::address_of(account));
        assert!(data.active, 100);
        // complete logic
    }
}
