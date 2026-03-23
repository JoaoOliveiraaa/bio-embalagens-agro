-- Seed de produtos
INSERT INTO public.products (slug, name, short_description, description, image_url, specifications, applications, benefits, badge, is_active, sort_order) VALUES
(
  'capsula-cv22',
  'Cápsula CV22',
  'Cápsula biodegradável para liberação de Cotesia flavipes no controle da broca-da-cana.',
  'A Cápsula CV22 é desenvolvida especialmente para a liberação do parasitoide Cotesia flavipes, utilizado no controle biológico da broca-da-cana (Diatraea saccharalis). Fabricada com materiais 100% biodegradáveis, a cápsula se degrada naturalmente no campo sem causar impactos ambientais.',
  '/images/products/capsula-cv22.jpg',
  '{"material": "Celulose biodegradável", "capacidade": "Até 6.000 pupas", "degradacao": "6 meses", "certificacao": "ASTM Internacional e ROHS"}',
  ARRAY['Controle biológico da broca-da-cana', 'Liberação via drone', 'Aplicação em canaviais'],
  ARRAY['100% biodegradável', 'Não contamina o meio ambiente', 'Alta eficiência na liberação', 'Compatível com drones'],
  'Mais Vendido',
  true,
  1
),
(
  'gaiola-modelo-66',
  'Gaiola para Armadilha 66',
  'Gaiola biodegradável para armadilhas de monitoramento de pragas.',
  'A Gaiola Modelo 66 é projetada para uso em armadilhas de monitoramento de pragas agrícolas. Sua estrutura permite a captura eficiente enquanto mantém o compromisso com a sustentabilidade ambiental.',
  '/images/products/gaiola-66.jpg',
  '{"material": "Celulose biodegradável", "dimensoes": "66mm diâmetro", "degradacao": "8-12 meses"}',
  ARRAY['Monitoramento de pragas', 'Armadilhas de feromônio', 'Culturas diversas'],
  ARRAY['Estrutura resistente', 'Fácil instalação', 'Biodegradável', 'Custo-benefício'],
  NULL,
  true,
  2
),
(
  'gaiola-modelo-70',
  'Gaiola para Armadilha 70',
  'Versão ampliada da gaiola biodegradável para armadilhas maiores.',
  'A Gaiola Modelo 70 oferece maior capacidade para armadilhas de monitoramento. Ideal para situações que demandam maior volume de captura ou pragas de maior porte.',
  '/images/products/gaiola-70.jpg',
  '{"material": "Celulose biodegradável", "dimensoes": "70mm diâmetro", "degradacao": "8-12 meses"}',
  ARRAY['Monitoramento de pragas grandes', 'Armadilhas industriais', 'Áreas de reflorestamento'],
  ARRAY['Maior capacidade', 'Alta durabilidade', 'Biodegradável', 'Versátil'],
  NULL,
  true,
  3
),
(
  'capsula-cvp-60',
  'Cápsula CVP 60',
  'Cápsula de proteção para pupas com sistema de ventilação integrado.',
  'A Cápsula CVP 60 foi desenvolvida com sistema de ventilação especial que garante a sobrevivência das pupas durante o transporte e armazenamento. Ideal para longas distâncias.',
  '/images/products/capsula-cvp60.jpg',
  '{"material": "Celulose biodegradável", "capacidade": "60 unidades", "ventilacao": "Sistema integrado", "degradacao": "6 meses"}',
  ARRAY['Transporte de pupas', 'Armazenamento prolongado', 'Distribuição regional'],
  ARRAY['Sistema de ventilação', 'Proteção durante transporte', 'Biodegradável', 'Mantém viabilidade'],
  'Novo',
  true,
  4
),
(
  'cone-hidroponia',
  'Cone para Hidroponia',
  'Cone biodegradável para sistemas hidropônicos e cultivo protegido.',
  'O Cone para Hidroponia é uma solução inovadora para cultivos em sistemas hidropônicos. Permite o desenvolvimento radicular saudável enquanto se biodegrada naturalmente após o ciclo de cultivo.',
  '/images/products/cone-hidroponia.jpg',
  '{"material": "Celulose biodegradável", "formato": "Cônico", "aplicacao": "Hidroponia", "degradacao": "4-6 meses"}',
  ARRAY['Cultivo hidropônico', 'Estufas', 'Produção de mudas', 'Agricultura vertical'],
  ARRAY['Desenvolvimento radicular otimizado', 'Biodegradável', 'Fácil manuseio', 'Sustentável'],
  NULL,
  true,
  5
),
(
  'capsula-cvc60',
  'Cápsula CVC60',
  'Cápsula compacta para liberação controlada de agentes biológicos.',
  'A Cápsula CVC60 é a versão compacta ideal para aplicações que requerem precisão na liberação de agentes de controle biológico. Seu tamanho reduzido permite maior densidade de distribuição.',
  '/images/products/capsula-cvc60.jpg',
  '{"material": "Celulose biodegradável", "formato": "Compacto", "capacidade": "Até 3.000 pupas", "degradacao": "6 meses"}',
  ARRAY['Liberação precisa', 'Alta densidade de aplicação', 'Culturas de alto valor'],
  ARRAY['Tamanho compacto', 'Alta precisão', 'Biodegradável', 'Econômico'],
  NULL,
  true,
  6
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  specifications = EXCLUDED.specifications,
  applications = EXCLUDED.applications,
  benefits = EXCLUDED.benefits,
  badge = EXCLUDED.badge,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Seed de soluções
INSERT INTO public.solutions (slug, name, short_description, description, image_url, icon, content, benefits, is_active, sort_order) VALUES
(
  'cana-de-acucar',
  'Cana de Açúcar',
  'Soluções biodegradáveis para controle biológico da broca-da-cana com tecnologia de ponta para aplicação via drone.',
  'A Bio Embalagens Agro, junto com grandes laboratórios nacionais é pioneira no desenvolvimento de uma nova tecnologia específica para aplicação via drone do agente biológico Cotesia flavipes. Uma das vantagens dessa liberação é a distribuição homogênea, com isso, o inseto não gasta tanta energia para procurar a praga ganhando maior eficiência.',
  '/images/solucoes/cana-de-acucar.jpg',
  'Wheat',
  '{
    "hero_text": "Tecnologia de ponta para o controle biológico da broca-da-cana",
    "main_content": "A Bio Embalagens Agro, junto com grandes laboratórios nacionais é pioneira no desenvolvimento de uma nova tecnologia específica para aplicação via drone do agente biológico Cotesia flavipes. Uma das vantagens dessa liberação é a distribuição homogênea, com isso, o inseto não gasta tanta energia para procurar a praga ganhando maior eficiência. Outro fator que deve ser analisado é o tempo, muito inferior de cobertura por hectare chegando a realizar 60ha/hora, comparado com o método tradicional.",
    "tubete_info": "Nossos Tubetes são produzidos de celulose e inodoro (atendendo as normas internacionais ASTM INTERNACIONAL e ROHS), foi projetado para os clientes que necessitam de uma rápida degradação, que ocorre em 6 meses, conforme pesquisa realizada pela pesquisadora Dr.ª. Alessandra Marieli Vacari, da Universidade de Franca, UNIFRAN. O recipiente é totalmente biodegradável e pode ser liberado no campo sem quaisquer problemas de contaminação ambiental.",
    "stats": [
      {"value": "60ha/hora", "label": "Cobertura via drone"},
      {"value": "6 meses", "label": "Degradação completa"},
      {"value": "100%", "label": "Biodegradável"}
    ]
  }',
  ARRAY['Biodegradável', 'Econômico', 'Não tem perda', 'Distribuição ideal', 'Agilidade na aplicação', 'Acompanhamento Real', 'Rapidez'],
  true,
  1
),
(
  'eucalipto',
  'Eucalipto',
  'Controle biológico sustentável para pragas florestais em plantações de eucalipto.',
  'Soluções especializadas para o manejo integrado de pragas em florestas de eucalipto, utilizando embalagens biodegradáveis para liberação de agentes de controle biológico.',
  '/images/solucoes/eucalipto.jpg',
  'TreePine',
  '{
    "hero_text": "Proteção sustentável para florestas de eucalipto",
    "main_content": "O setor florestal brasileiro enfrenta desafios constantes com pragas que afetam a produtividade das plantações de eucalipto. A Bio Embalagens Agro oferece soluções biodegradáveis especialmente desenvolvidas para o controle biológico neste setor, permitindo a liberação eficiente de parasitoides e predadores naturais.",
    "benefits_detail": "Nossas embalagens são projetadas para suportar as condições específicas do ambiente florestal, garantindo a proteção dos agentes biológicos durante o transporte e a liberação controlada no campo.",
    "stats": [
      {"value": "Sustentável", "label": "100% biodegradável"},
      {"value": "Eficiente", "label": "Alta taxa de sucesso"},
      {"value": "Econômico", "label": "Redução de custos"}
    ]
  }',
  ARRAY['Sustentabilidade ambiental', 'Redução de químicos', 'Proteção da biodiversidade', 'Certificação florestal', 'Custo-benefício'],
  true,
  2
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  icon = EXCLUDED.icon,
  content = EXCLUDED.content,
  benefits = EXCLUDED.benefits,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
