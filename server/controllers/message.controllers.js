import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const image = req.file;

    // console.log("Request Body:", req.body);
    // console.log("Request File:", image);

    if (!message && !image) {
      return res.json({
        message: "Please enter a message or upload an image",
        success: false,
      });
    }

    const receiverId = req.params.id;
    const senderId = req.user?.id;

    if (!receiverId || !senderId) {
      return res.json({ message: "Invalid ID's", success: false });
    }

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      console.log("No conversation found, creating a new one.");
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({ senderId, receiverId });

    if (message) newMessage.message = message;

    if (image) {
      const fileUri = getDataUri(image);
      console.log("Uploading image to Cloudinary...");
      const cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "ChatterBox",
      });
      newMessage.image = cloudResponse.secure_url;
      console.log("Image uploaded:", cloudResponse.secure_url);
    }

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // console.log("Message saved:", newMessage);

    // Emit new message via Socket.IO
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ newMessage, success: true });
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;
    // console.log(senderId, receiverId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const senderId = message.senderId;
    const receiverId = message.receiverId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    conversation.messages = conversation.messages.filter(
      (msg) => msg._id.toString() !== id
    );
    await Promise.all([conversation.save(), Message.findByIdAndDelete(id)]);

    return res.json({ message: "Deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};
