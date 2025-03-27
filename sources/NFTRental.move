module rental::NFTRental {
    use std::signer;
    use std::string::String;

    struct RentalNFT has store, key, drop {
        owner: address,
        token_id: u64,
        item_name: String,
    }

    // Mint an NFT for an item (rented item)
    public entry fun mint_rental_nft(account: &signer, item_name: String) {
        let addr = signer::address_of(account);
        let token_id = 1; // Increment this ID for new items
        let nft = RentalNFT {
            owner: addr,
            token_id,
            item_name,
        };
        move_to(account, nft);
    }

    // Transfer NFT for ownership of the rented item
    public entry fun transfer_nft(account: &signer, to: address, token_id: u64) acquires RentalNFT {
        let RentalNFT { owner: _, token_id: old_token_id, item_name } = move_from<RentalNFT>(signer::address_of(account));
        assert!(old_token_id == token_id, 100);
        let new_nft = RentalNFT {
            owner: to,
            token_id,
            item_name,
        };
        move_to(account, new_nft);
    }
}
