import { ToastContainer, Bounce, Slide} from 'react-toastify';

export default function Notification() {

    return(
        <>
            <ToastContainer 
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}   
            />
        </>
    )
}