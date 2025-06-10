import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';

const SignaturePad = ({ onSave }: { onSave: (dataUrl: string) => void }) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: 'w-full h-64 border' }}
      />
      <div className="flex justify-between mt-4">
        <Button onClick={clear} className="bg-gray-500 hover:bg-gray-600">
          Limpar
        </Button>
        <Button onClick={save} className="bg-primary-800 hover:bg-primary-700">
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
