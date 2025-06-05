
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search
} from 'lucide-react';
import { useState } from 'react';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      nome: 'João Silva',
      lastMessage: 'Obrigado pela atualização do processo',
      time: '10:30',
      unread: 2,
      online: true,
      case: 'Processo Trabalhista'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      lastMessage: 'Quando podemos agendar a próxima reunião?',
      time: '09:15',
      unread: 0,
      online: false,
      case: 'Divórcio'
    },
    {
      id: 3,
      nome: 'Dr. Pedro Oliveira',
      lastMessage: 'Documentos enviados para revisão',
      time: 'Ontem',
      unread: 1,
      online: true,
      case: 'Interno'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'João Silva',
      content: 'Bom dia, Dr. Ana. Gostaria de saber sobre o andamento do meu processo.',
      time: '09:00',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Você',
      content: 'Bom dia, João! O processo está a correr bem. Conseguimos agendar a audiência para a próxima semana.',
      time: '09:05',
      isOwn: true
    },
    {
      id: 3,
      sender: 'João Silva',
      content: 'Excelente! Preciso de preparar alguma documentação adicional?',
      time: '09:10',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Você',
      content: 'Sim, vou enviar uma lista dos documentos necessários. Por favor, providencie-os até quinta-feira.',
      time: '09:15',
      isOwn: true
    },
    {
      id: 5,
      sender: 'João Silva',
      content: 'Perfeito. Obrigado pela atualização do processo!',
      time: '10:30',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <DashboardLayout>
      <div className="p-6 h-[calc(100vh-2rem)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Chat</h1>
            <p className="text-gray-600">Comunicação segura com clientes e equipa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-6rem)]">
          {/* Conversations List */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-primary-800 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Conversas
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar conversas..."
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`p-4 cursor-pointer transition-colors border-l-4 ${
                      selectedChat === conversation.id
                        ? 'bg-primary-50 border-primary-800'
                        : 'hover:bg-gray-50 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary-100 text-primary-800">
                            {conversation.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-primary-800 truncate">{conversation.nome}</h4>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400">{conversation.case}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-primary-800 text-white">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="rounded-2xl border-0 shadow-lg h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary-100 text-primary-800">
                        {selectedConversation?.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-primary-800">{selectedConversation?.nome}</h3>
                      <p className="text-sm text-gray-600">{selectedConversation?.case}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                        <div className={`p-3 rounded-2xl ${
                          msg.isOwn 
                            ? 'bg-primary-800 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Escreva uma mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-xl border-gray-200"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // TODO: Send message
                        setMessage('');
                      }
                    }}
                  />
                  <Button className="bg-primary-800 hover:bg-primary-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
