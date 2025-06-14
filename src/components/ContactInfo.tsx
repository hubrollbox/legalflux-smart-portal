
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => (
  <Card className="rounded-2xl border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="text-primary-800">Informações de Contacto</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-start space-x-3">
        <Mail className="h-5 w-5 text-primary-800 mt-1" />
        <div>
          <p className="font-medium">Email</p>
          <a
            href="mailto:suporte@legalflux.pt"
            className="text-gray-600 hover:text-primary-800 transition-colors"
          >
            suporte@legalflux.pt
          </a>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Phone className="h-5 w-5 text-primary-800 mt-1" />
        <div>
          <p className="font-medium">Telefone</p>
          <a
            href="tel:+351220145169"
            className="text-gray-600 hover:text-primary-800 transition-colors"
          >
            +351 22 0145 169
          </a>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <MapPin className="h-5 w-5 text-primary-800 mt-1" />
        <div>
          <p className="font-medium">Morada</p>
          <p className="text-gray-600">
            Edifício Diplomata<br />
            4450-075 Matosinhos
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Clock className="h-5 w-5 text-primary-800 mt-1" />
        <div>
          <p className="font-medium">Horário de Atendimento</p>
          <p className="text-gray-600">
            Segunda a Sexta: 9h00 - 18h00
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ContactInfo;
