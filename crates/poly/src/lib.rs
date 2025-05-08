use wasm_bindgen::prelude::*;

mod utils;
extern crate web_sys;

#[allow(unused_macros)]
// A macro target_scale provide `log!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
pub fn add(left: u32, right: u32) -> u32 {
    utils::panic_hook::set_panic_hook();
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
