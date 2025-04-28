import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';


const CartInfo = ({cart,close}) => {
const dispatch = useDispatch();
    const subTotal = cart.reduce((total, item) => total + item.price * item.amount, 0);
    const shipping = subTotal >= 100 || subTotal === 0 ? 0 : 20;
    const total = subTotal + shipping;

    const handleClick = () => {
        close();
        dispatch(clearCart());
        toast.success("Ürünler hazırlanıyor...")
    };

  return (
    <div className='fs-5 py-5 text-lg'>
      <p className=' flex justify-between'>
        <span className='text-gray-500 font-semibold'>Ara Toplam</span>
        <span className='font-semibold text-gray-700'>{subTotal}₺</span>
      </p>

      <p className=' flex justify-between py-2'>
        <span className='text-gray-500 font-semibold'>Kargo</span>
        <span className='font-semibold text-gray-700'>{shipping > 100 ? "Ücretsiz" : `${shipping}₺`}</span>
      </p>

      <p className=' flex justify-between'>
        <span className='text-gray-500 font-semibold'>Toplam</span>
        <span className='font-semibold text-gray-700 text-2xl'>{total}₺</span>
      </p>

      <button onClick={handleClick} className='bg-red-500 mt-4 w-full p-2 rounded-md text-white hover:bg-red-600 disabled:bg-red-300'>Sipariş Ver</button>
    </div>
  );
};

export default CartInfo
