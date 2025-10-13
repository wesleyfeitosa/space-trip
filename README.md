# Space Trip

## RF (Requisitos Funcionais)

- [x] Deve ser possível listar os proxímos lançamentos de foguetes;
- [x] Deve ser possível ver os detalhes de cada lançamento;
- [x] Deve ter a opção de escolha do idioma entre inglês e português;
- [ ] Deve ter a opção de escolha do tema black ou light;

## RN (Regras de negócio)

- [x] O cache das requisições deve ser revalidado a cada 1 hora

## RNF (Requisitos não funcionais)

- [x] Usar cache nas requisições para poupar recursos da api;
- [x] Deve usar as últimas versões do Next e da API consumida;
- [ ] Gerenciar a limitação de 15 requisições por hora;
- [x] Deve ter uma interface responsiva;
- [x] Deve ter uma interface de boa acessabilidade;
- [x] Deve renderizar primeiro uma imagem de menor qualidade para melhorar a performance;
- [ ] Deve ter um infinite scroll dos dados de lançamentos na página inicial;
- [ ] Deve ter um loading em tela nas ações de carregamento de requisições;
