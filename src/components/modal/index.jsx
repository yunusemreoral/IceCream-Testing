import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import CartItem from "./cart-item";
import CartInfo from "./cart-info";

const Modal = ({isOpen,close}) => {
    const {cart} = useSelector((store) => store);
  return (
    isOpen && (
    <div data-testid="modal" className='fixed inset-0 bg-black/30 backdrop:-blur-sm grid place-items-center z-[999]'>
      <div className='bg-white p-5 rounded-lg w-[90%] md:max-w-[600px] text-black'>
        
        {/* üst kısım */}
        <div className='border-b pb-3 flex justify-between max-md:text-lg fs-5'>
            <h1 className='font-semibold'>Sipariş</h1>

            <button onClick={close} data-testid="close" className='border p-2 rounded-md hover:bg-gray-300/50 transition'>
            <IoClose/>
            </button>
        </div>

{/* sepetteki ürünler */}
        <div className="py-5 border-b">
            {cart.length === 0 ? (
            <p className="text-center text-gray-600 text-lg font-semibold">Henüz sepete ürün eklenmedi</p>
        ) : (
            cart.map((item) => <CartItem key={item.id} item={item} /> )
        )}
        </div>

{/* toplam kısmı */}
        <CartInfo cart={cart} close={close} />
      </div>
    </div>
    )
  );
};

export default Modal
