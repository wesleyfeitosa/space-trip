# Space Trip

## RF (Requisitos Funcionais)

- [X] Deve ser possível listar os proxímos lançamentos de foguetes;
- [ ] Deve ser possível ver os detalhes de cada lançamento;
- [ ] Deve ter a opção de escolha do idioma entre inglês e português;
- [ ] Deve ter a opção de escolha do tema black ou light;

## RN (Regras de negócio)

- [X] O cache das requisições deve ser revalidado a cada 1 hora

## RNF (Requisitos não funcionais)

- [X] Usar cache nas requisições para poupar recursos da api;
- [X] Deve usar as últimas versões do Next e da API consumida;
- [ ] Gerenciar a limitação de 15 requisições por hora;
- [ ] Deve ter uma interface responsiva;
- [ ] Deve ter uma interface de boa acessabilidade;
- [X] Deve renderizar primeiro uma imagem de menor qualidade para melhorar a performance;
- [ ] Deve ter um infinite scroll dos dados de lançamentos na página inicial;

