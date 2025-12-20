import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"

export const getAllContacts= async(req, res)=>{
    try{
        const loggedInUserId= req.user._id;
        const filteredUsers= await User.find({_id :{ $ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers);

    }catch(error){
        console.log("Error in getAllContacts: ",error);
        res.status(500).json({message: "Server error"});
    }

}

export const getMessagesByUserId= async (req,res)=>{
    try{
        const myId = req.user._id;
        const  {id:userToChatId}= req.params


        //me and you are messaging 
        //i send u the message
        //u send me the message
        const message = await Message.find({
            $or:[
                {senderId: myId,receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(message);

    }
    catch(error){
        console.log("Error in messages controller: ",error.message);
        res.status(500).json({error : "Internal sever error"})

    }
}

export const sendMessage = async (req,res)=>{
    try{
        const {text, image}= req.body;
        const {id: receiverId}= req.params;
        const senderId= req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url;
        }
    

        
        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        //tdo : send msg in real time if user is online 
        res.status(200).json(newMessage)


    }
    catch(error){
        console.log("Server error: ",error)
        res.status(500).json({error : "Internal sever error"})
    }
}

export const getChatPartners = async(req, res)=>{
    //total contacts are let say 100 
    //But we have only msgs with 2 users and display them under the cahts
    //sender is us
    //reciever is us display them
    try{
        const loggedInUserId= req.user._id;
  // find all the messages where the lpgged in users is either sender or reciever
        const messages = await Message.find({
            $or:[
                {senderId:loggedInUserId },
                { receiverId: loggedInUserId}
            ]
        });

        //Ab sirf “samne wale” ka ID nikaalna
        const getChatPartnerIds = [...new Set( messages.map((msg)=>
        msg.senderId.toString()=== loggedInUserId.toString()
        ?msg.receiverId.toString()
        : msg.senderId.toString())
    )];

   
//4️⃣ Ab un IDs se user details nikaalo
    const getChatPartners = await User.find({_id:{$in: getChatPartnerIds}}).select("-password")

    res.status(200).json(getChatPartners)
    }catch(error){
        console.log("Server Error: ",error)
        res.status(500).json({error: "Internal server error"})
    }

}