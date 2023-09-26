use wasm_bindgen::prelude::*;
extern crate bcrypt;
use bcrypt::{hash, DEFAULT_COST};

#[wasm_bindgen]
pub fn hash_input(password: &str) -> String {

    let hashed_password = hash(password, DEFAULT_COST).unwrap();
    format!("{}", hashed_password)

}
