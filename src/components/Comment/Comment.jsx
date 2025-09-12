import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../assets/url";
import axios from "axios";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Comment = ({ data  }) => {
  const { user } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleAddComment = async (productId) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لإضافة تعليق");
      return;
    }
    if (comment.trim() === "") return toast.error("لا يمكن اضافه تعليق فارغ");

    try {
      await axios.post(
        `${BASE_URL}/comment/add`,
        { comment, productId },
        { withCredentials: true }
      );
      toast.success("تمت إضافة التعليق ✅");
      setComment("");
      getOneComment();
    } catch (err) {
      console.log(err);
    }
  };



  const getOneComment = async ()=>{
    try{
        const res = await axios.get(`${BASE_URL}/comment/product/${data._id}`,{withCredentials:true})
        setComments(res.data)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    if (data && data._id) {
        getOneComment();
    }
  }, [data]);


  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">التعليقات</h2>


      <div className="mb-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب تعليقك هنا..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
        />
        <button
          onClick={() => handleAddComment(data._id)}
          className="cursor-pointer mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Comment
        </button>
      </div>


      {comments.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {comments.map((c, i) => (
            <SwiperSlide key={i}>
              <div className="p-5 border border-gray-200 rounded-xl shadow-md bg-white h-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-900">
                    {c.user.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed break-words max-h-28 overflow-y-auto">{c.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">لا يوجد تعليقات حتى الآن، كن أول من يعلق!</p>
      )}
    </section>
  );
};

export default Comment;
