import Rating from "react-rating";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const ToyCard = ({ toy }) => {
    const {user} = useContext(AuthContext)
    const { _id, toy_name, picture, price, rating } = toy || {};

    const handleNotify = () => {
        if(!user){
            return toast('You have to log in first to view details!', {
                icon: 'ℹ️',
            })
        }
    }

    return (
        <div className="card w-full shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
            <figure className="px-5 pt-5">
                <img src={picture} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="p-5 space-y-4">
                <h2 className="font-bold text-2xl text-[#333E48]">{toy_name}</h2>
                <div className="flex justify-between items-center">
                        <p className="font-bold text-4xl text-rose-500">${price}</p>
                    <div>
                        <Rating className="text-yellow-400"
                            readonly
                            placeholderRating={rating}
                            emptySymbol={<FaRegStar />}
                            placeholderSymbol={<FaStar />}
                            fullSymbol={<FaStar />}
                        />
                        <span className="font-bold text-[#333E48] ml-2">{rating}</span>
                    </div>
                </div>
                <div>
                    <Link onClick={handleNotify} to={`/toys/toy/${_id}`}><button className="rounded-btn">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ToyCard;