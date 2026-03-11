"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCheck,
  Mail,
  Paperclip,
  Pin,
  Search,
  Send
} from "lucide-react"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"

// --- Types ---
interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  isOnline: boolean
  isTyping?: boolean
  pinned: boolean
}

interface Message {
  id: string
  content: string
  image?: string
  senderId: string
  senderName: string
  senderAvatar: string
  time: string
  isMe: boolean
}

// --- Mock Data ---
const CHATS: Chat[] = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=1",
    lastMessage: "I've attached the anxiety...",
    time: "10:45 AM",
    isOnline: true,
    pinned: true,
  },
  {
    id: "2",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=2",
    lastMessage: "I've attached the anxiety...",
    time: "10:45 AM",
    isOnline: true,
    pinned: true,
  },
  {
    id: "3",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=3",
    lastMessage: "Jane Typing...",
    time: "2:32 AM",
    isOnline: true,
    isTyping: true,
    pinned: true,
  },
  {
    id: "4",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=4",
    lastMessage: "I've attached the anxiety...",
    time: "10:45 AM",
    isOnline: true,
    pinned: false,
  },
  {
    id: "5",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=5",
    lastMessage: "I've attached the anxiety...",
    time: "10:45 AM",
    isOnline: true,
    pinned: false,
  },
  {
    id: "6",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=6",
    lastMessage: "I've attached the anxiety...",
    time: "10:45 AM",
    isOnline: true,
    pinned: false,
  },
  {
    id: "7",
    name: "Dr. Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=7",
    lastMessage: "I've attached the anxiety...",
    time: "10:45 AM",
    isOnline: true,
    pinned: false,
  },
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    senderName: "Anika Chowdhury",
    senderAvatar: "https://i.pravatar.cc/150?u=8",
    content: "Hi Dr. Sarah, I've been practicing the breathing techniques we talked about. They're helping a bit during work hours.",
    time: "11:42 AM",
    senderId: "user",
    isMe: false,
  },
  {
    id: "2",
    senderName: "Rahim Khan",
    senderAvatar: "https://i.pravatar.cc/150?u=1",
    content: "That's wonderful to hear! Consistency is key with those exercises. I've attached a PDF with a few more advanced",
    time: "12:10 PM",
    senderId: "rahim",
    isMe: true,
  },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(CHATS[0])
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [messageText, setMessageText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [showChatList, setShowChatList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!messageText.trim() && !selectedImage) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      image: selectedImage || undefined,
      senderId: "me",
      senderName: "Rahim Khan",
      senderAvatar: "https://i.pravatar.cc/150?u=1",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }

    setMessages([...messages, newMessage])
    setMessageText("")
    setSelectedImage(null)
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else if (file) {
      // For non-images, we'll keep the existing "Sent a file" behavior for now
      const newMessage: Message = {
        id: Date.now().toString(),
        content: `Sent a file: ${file.name}`,
        senderId: "me",
        senderName: "Rahim Khan",
        senderAvatar: "https://i.pravatar.cc/150?u=1",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }
      setMessages([...messages, newMessage])
    }
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
    setShowChatList(false)
  }

  const filteredChats = CHATS.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex bg-white rounded-xl h-[calc(100vh-120px)] overflow-hidden relative">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      {/* Sidebar */}
      <div className={cn(
        "flex-col bg-white h-full border-r border-slate-100 transition-all duration-300",
        "fixed inset-0 z-20 md:relative md:flex md:w-[400px]",
        showChatList ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 md:p-8 flex flex-col gap-6 shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-[#2D2D2D]">Message</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className={cn("rounded-full h-10 w-10 md:h-12 md:w-12 border border-slate-100/50 transition-all", isSearchVisible ? "bg-[#9B8FC7] text-white" : "bg-slate-50 text-slate-500")}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <AnimatePresence>
            {isSearchVisible && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search chats..."
                  className="h-11 pl-11 bg-slate-50 border-none rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-[#9B8FC7]/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          {/* Pinned Messages */}
          <div className="px-4 md:px-6 mb-8">
            <div className="flex items-center gap-2 text-slate-400 text-[11px] md:text-[13px] font-bold uppercase tracking-wider mb-5 px-2">
              <Pin className="h-4 w-4" />
              Pinned Message
            </div>
            <div className="space-y-1">
              {filteredChats.filter(c => c.pinned).map(chat => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={selectedChat.id === chat.id}
                  onClick={() => handleChatSelect(chat)}
                />
              ))}
            </div>
          </div>

          {/* All Messages */}
          <div className="px-4 md:px-6 pb-8">
            <div className="flex items-center gap-2 text-slate-400 text-[11px] md:text-[13px] font-bold uppercase tracking-wider mb-5 px-2">
              <Mail className="h-4 w-4" />
              All Message
            </div>
            <div className="space-y-1">
              {filteredChats.filter(c => !c.pinned).map(chat => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={selectedChat.id === chat.id}
                  onClick={() => handleChatSelect(chat)}
                />
              ))}
              {filteredChats.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-sm italic font-medium">No chats found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-white h-full justify-between transition-all duration-300",
        "w-full fixed inset-0 z-10 md:relative md:w-auto",
        !showChatList ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        {/* Chat Header */}
        <div className="h-20 md:h-28 px-4 md:px-10 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowChatList(true)}
              className="md:hidden rounded-full hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Button>
            <div className="relative">
              <Avatar className="h-10 w-10 md:h-14 md:w-14 ring-2 ring-white shadow-md">
                <AvatarImage src={selectedChat.avatar} />
                <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
              </Avatar>
              {selectedChat.isOnline && (
                <span className="absolute bottom-0 right-0 md:right-1 h-3 md:h-3.5 w-3 md:w-3.5 rounded-full border-2 border-white bg-blue-500" />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-base md:text-lg font-bold text-[#2D2D2D] truncate max-w-[120px] sm:max-w-none">{selectedChat.name}</h2>
              <span className="text-[11px] md:text-[13px] text-slate-400 font-medium">Psychologist . Active 5m ago</span>
            </div>
          </div>
          <Button className="h-10 md:h-12 px-4 md:px-8 bg-[#9B8FC7] cursor-pointer hover:bg-[#8A79B8] text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg shadow-[#9B8FC7]/20">
            Book Session
          </Button>
        </div>

        {/* Messages Body */}
        <ScrollArea className="flex-1 p-4 md:p-8 bg-[#F8F9FB] overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-10">
            <div className="flex justify-center">
              <span className="px-4 md:px-5 py-1 md:py-1.5 bg-white rounded-full text-[11px] md:text-[13px] font-bold text-slate-400 shadow-sm border border-slate-100/50">
                Today
              </span>
            </div>

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex items-start gap-3 md:gap-4",
                    msg.isMe ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className="h-9 w-9 md:h-11 md:w-11 mt-1 border-2 border-white shadow-sm flex-shrink-0">
                    <AvatarImage src={msg.senderAvatar} />
                    <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "flex flex-col gap-1.5 md:gap-2 max-w-[85%] md:max-w-[70%]",
                    msg.isMe ? "items-end" : "items-start"
                  )}>
                    <div className="flex items-center gap-2 md:gap-3 px-1">
                      <span className="text-[13px] md:text-[14px] font-bold text-[#2D2D2D]">{msg.senderName}</span>
                      <span className="text-[10px] md:text-[12px] text-slate-400 font-medium">{msg.time}</span>
                    </div>
                    <div className={cn(
                      "px-4 md:px-6 py-2.5 md:py-4 rounded-2xl md:rounded-3xl text-[14px] md:text-[15px] leading-relaxed flex flex-col gap-2 md:gap-3",
                      msg.isMe
                        ? "bg-[#EBF1F3] text-[#2D2D2D] rounded-tr-none"
                        : "bg-white text-[#2D2D2D] rounded-tl-none shadow-sm"
                    )}>
                      {msg.image && (
                        <div className="rounded-xl overflow-hidden border border-slate-100/50 shadow-sm">
                          <Image src={msg.image} alt="Sent image" height={1000} width={1000} className="max-h-40 md:max-h-60 object-cover w-full" />
                        </div>
                      )}
                      {msg.content && <span>{msg.content}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </ScrollArea>

        {/* Input Bar */}
        <div className="p-4 md:p-8 bg-[#F8F9FB] shrink-0 border-t border-slate-100 flex flex-col gap-3 md:gap-4">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden border-2 border-white shadow-lg group"
              >
                <Image src={selectedImage} alt="Preview" height={1000} width={1000} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-1 right-1 h-5 w-5 md:h-6 md:w-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-base md:text-lg leading-none">&times;</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto flex items-center gap-2 md:gap-4 bg-white p-2 md:p-3 rounded-xl w-full shadow-sm"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleFileClick}
              className="h-10 w-10 md:h-11 md:w-11 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <Paperclip className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Input
              placeholder="Type your message here ..."
              className="flex-1 h-10 md:h-12 bg-transparent border-none focus-visible:ring-0 text-sm md:text-base placeholder:text-slate-400"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button
              type="submit"
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-[#9B8FC7] hover:bg-[#8A79B8] text-white transition-all shadow-lg shadow-[#9B8FC7]/20 flex items-center justify-center p-0"
            >
              <Send className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

function ChatListItem({ chat, isActive, onClick }: { chat: Chat, isActive: boolean, onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl cursor-pointer transition-all hover:bg-slate-50",
        isActive && "bg-slate-50"
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-white">
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        {chat.isOnline && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full border-2 border-white bg-[#2DC766]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#2D2D2D] truncate">{chat.name}</h3>
          <span className="text-[10px] md:text-[11px] font-medium text-[#9B8FC7] whitespace-nowrap">{chat.time}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={cn(
            "text-[12px] md:text-[13px] truncate",
            chat.isTyping ? "text-[#9B8FC7] font-semibold italic" : "text-slate-400"
          )}>
            {chat.lastMessage}
          </p>
          {!chat.isTyping && <CheckCheck className="h-3.5 w-3.5 md:h-4 md:w-4 text-slate-400 flex-shrink-0" />}
        </div>
      </div>
    </div>
  )
}