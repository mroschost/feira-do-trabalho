import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, Target, Users } from 'lucide-react';

const DEFAULT_BG =
  "https://horizons-cdn.hostinger.com/718b8f64-1940-429b-a87c-9e47a937b76f/606dfbe8293afc56d33d19538902dde6.webp";

/**
 * Presentation
 * - Mostra um bloco "Sobre" com título, parágrafos e 3 pilares com ícones.
 * - Tornado parametrizável por props, com valores padrão iguais ao conteúdo atual.
 */
const Presentation = ({
  title = "Feira do Trabalho e do Campo",
  paragraphs = [
    "A Feira do Trabalho e do Campo é um espaço feito por e para quem trabalha com a terra. Aqui a gente aprende junto, troca experiências e mostra o valor do que nasce do nosso esforço. É um lugar pra fortalecer a agricultura familiar, abrir caminho pra novos negócios e garantir mais renda e dignidade pra quem vive do campo.",
    "Nos encontros, oficinas e vendas, cada agricultor e agricultora tem vez e voz pra mostrar seu trabalho, aprender coisas novas e fazer parceria boa. A gente planta conhecimento pra colher oportunidades."
  ],
  pillars = [
    {
      icon: "Leaf",
      title: "Produção e Comercialização",
      text: "Espaço pra vender produtos direto do produtor, mostrando o que é feito na roça e nas comunidades."
    },
    {
      icon: "Users",
      title: "Capacitação e Aprendizado",
      text: "Oficinas, cursos e palestras com certificado, pra aprender sobre gestão, finanças e novas técnicas."
    },
    {
      icon: "Target",
      title: "Parcerias e Negócios",
      text: "Reuniões e trocas com empresas, cooperativas e órgãos públicos pra abrir novos caminhos."
    },
    {
      icon: "Users",
      title: "Cultura e Tradição",
      text: "Apresentações e atividades que valorizam o modo de vida, a arte e a força do povo do campo."
    }
  ],
  backgroundUrl = DEFAULT_BG,
  accentColorClass = "bg-[#3FA637]"
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Resolve ícones a partir do nome em `pillars`
  const ICONS = { Leaf, Users, Target };
  const getIcon = (name) => ICONS[name] || Leaf;

  return (
    <section
      aria-labelledby="sobre-title"
      className="relative pt-10 pb-20 bg-center bg-no-repeat bg-cover sm:pt-14 md:pt-24 md:pb-24"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: '120%',
      }}
    >
      {/* overlay sutil para legibilidade sem "lavar" a imagem */}
      <div className="absolute inset-0 bg-white/0" aria-hidden="true" />

      <div className="relative px-4 mx-auto">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl p-8 mx-auto text-center shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
          role="region"
          aria-labelledby="sobre-title"
        >
          <h2 id="sobre-title" className="mb-8 text-3xl font-bold text-gray-800 md:text-4xl">
            {title}
          </h2>

          <div className="grid gap-8 mb-12 text-left md:grid-cols-2">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {paragraphs.map((p, idx) => (
                <p key={idx} className={`text-lg text-gray-700 leading-relaxed text-justify ${idx === 0 ? "mb-6" : ""}`}>
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <ul className="space-y-6">
                {pillars.map((item, idx) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`${accentColorClass} p-3 rounded-full`}>
                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-xl font-semibold text-gray-800">{item.title}</h3>
                        <p className="leading-relaxed text-justify text-gray-600">{item.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Presentation;