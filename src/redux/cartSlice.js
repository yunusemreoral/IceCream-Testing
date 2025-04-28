import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, {payload}) => {
            // sepette aynı üründen var mı
         const found = state.cart.find((item) => item.id === payload.item.id && item.id && item.type === payload.selectedType);

         if(found) {
            // eger sepette aynı üründen varsa miktarını artırır
            found.amount++;
         } else {
            // eger yoksa yeni ürün sepete ekle
            state.cart.push({
                ...payload.item,
                type: payload.selectedType,
                amount: 1,
            });
         }
        },

        deleteFromCart: (state, {payload}) => {
            // sepetteki ürünü bul
            const index = state.cart.findIndex((item) => item.id === payload.id && item.type === payload.type);

            if(state.cart[index].amount > 1) {
                // eger miktarı birden fazla ise miktar azalt
                state.cart[index].amount--;
            } else {
                // eğer miktar bir ise ürünü kaldır 
                state.cart.splice(index, 1);
            }
        },

        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const {addToCart,deleteFromCart,clearCart} = cartSlice.actions;

export default cartSlice.reducer;

