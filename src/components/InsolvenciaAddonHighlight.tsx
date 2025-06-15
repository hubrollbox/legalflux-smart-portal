
import { Link } from "react-router-dom";
import { FileText, Users } from "lucide-react";

const InsolvenciaAddonHighlight = () => (
  <section className="py-16 bg-gradient-to-br from-white to-primary-50 border-y border-primary-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center gap-6">
      <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary-100 rounded-full text-primary-900 mb-2 font-medium text-sm animate-fade-in">
        <FileText className="h-5 w-5 text-accent-700" />
        NOVO Add-on Premium para Administradores de Insolvência
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 leading-tight">
        LegalFlux Insolvências
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Gest&atilde;o inteligente de massas falidas, credores e bens, com 
        <span className="text-accent-700 font-semibold"> gera&ccedil;&atilde;o autom&aacute;tica de documentos legais</span> (Art. 129º, 153º, 154º do CIRE).
        Disponível apenas para subscritores profissionais e enterprise.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <Link
          to="/integracoes"
          className="bg-accent-700 hover:bg-accent-800 px-8 py-3 text-white font-bold rounded-xl shadow transition"
        >
          Saber Mais &amp; Ativar
        </Link>
        <a
          href="#planos"
          className="border border-primary-700 text-primary-800 px-8 py-3 font-bold rounded-xl bg-white hover:bg-primary-50 transition"
        >
          Ver Planos de Subscrição
        </a>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 w-full">
        <li className="bg-white rounded-xl p-6 shadow-sm border border-primary-100 flex flex-col items-center">
          <Users className="h-8 w-8 mb-2 text-primary-800" />
          <span className="font-semibold text-primary-900">Massas falidas, credores e bens</span>
          <span className="text-sm text-gray-500 mt-1">Registo detalhado e checklist por etapa</span>
        </li>
        <li className="bg-white rounded-xl p-6 shadow-sm border border-primary-100 flex flex-col items-center">
          <FileText className="h-8 w-8 mb-2 text-accent-700" />
          <span className="font-semibold text-primary-900">Documentos legais automáticos</span>
          <span className="text-sm text-gray-500 mt-1">Art. 129º, 153º, 154º - PDF pronto a entregar</span>
        </li>
        <li className="bg-white rounded-xl p-6 shadow-sm border border-primary-100 flex flex-col items-center">
          <span className="inline-block h-8 w-8 mb-2 bg-accent-700 rounded-full"></span>
          <span className="font-semibold text-primary-900">Só para subscritores</span>
          <span className="text-sm text-gray-500 mt-1">Disponível Profissional/Enterprise</span>
        </li>
      </ul>
    </div>
  </section>
);

export default InsolvenciaAddonHighlight;
