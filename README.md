# @phdiniiz/brasil-utils

Utilitários gerais para desenvolvimento no Brasil.

## Instalação

```bash
pnpm add @phdiniiz/brasil-utils
```

ou

```bash
npm install @phdiniiz/brasil-utils
```

ou

```bash
yarn add @phdiniiz/brasil-utils
```

## Uso

### Validações Brasileiras

O pacote inclui funções de validação para documentos e telefones brasileiros, sem dependências externas.

#### Validação de CPF

Valida um CPF (Cadastro de Pessoa Física) brasileiro.

```typescript
import { validarCPF } from '@phdiniiz/brasil-utils';

// Aceita CPF formatado ou apenas números
validarCPF('123.456.789-09'); // true
validarCPF('12345678909'); // true
validarCPF('111.111.111-11'); // false (sequência repetida)
validarCPF('123.456.789-00'); // false (dígitos verificadores inválidos)
```

#### Validação de CNPJ

Valida um CNPJ (Cadastro Nacional de Pessoa Jurídica) brasileiro.

```typescript
import { validarCNPJ } from '@phdiniiz/brasil-utils';

// Aceita CNPJ formatado ou apenas números
validarCNPJ('11.222.333/0001-81'); // true
validarCNPJ('11222333000181'); // true
validarCNPJ('11.111.111/1111-11'); // false (sequência repetida)
validarCNPJ('11.222.333/0001-00'); // false (dígitos verificadores inválidos)
```

#### Validação de Telefone Fixo

Valida um telefone fixo brasileiro (10 dígitos: DDD + 8 dígitos).

```typescript
import { validarTelefone } from '@phdiniiz/brasil-utils';

// Aceita telefone formatado ou apenas números
validarTelefone('(11) 3456-7890'); // true
validarTelefone('1134567890'); // true
validarTelefone('(11) 91234-5678'); // false (celular, não telefone fixo)
validarTelefone('(10) 3456-7890'); // false (DDD inválido)
```

#### Validação de Celular

Valida um celular brasileiro (11 dígitos: DDD + 9 dígitos começando com 9).

```typescript
import { validarCelular } from '@phdiniiz/brasil-utils';

// Aceita celular formatado ou apenas números
validarCelular('(11) 91234-5678'); // true
validarCelular('11912345678'); // true
validarCelular('(11) 3456-7890'); // false (telefone fixo, não celular)
validarCelular('(11) 81234-5678'); // false (não começa com 9)
validarCelular('(10) 91234-5678'); // false (DDD inválido)
```

#### Importação Combinada

Você pode importar todas as funções de uma vez:

```typescript
import {
  validarCPF,
  validarCNPJ,
  validarTelefone,
  validarCelular,
} from '@phdiniiz/brasil-utils';

// Exemplo de uso em formulário
const cpf = '123.456.789-09';
const cnpj = '11.222.333/0001-81';
const telefone = '(11) 3456-7890';
const celular = '(11) 91234-5678';

if (validarCPF(cpf)) {
  console.log('CPF válido');
}

if (validarCNPJ(cnpj)) {
  console.log('CNPJ válido');
}

if (validarTelefone(telefone)) {
  console.log('Telefone válido');
}

if (validarCelular(celular)) {
  console.log('Celular válido');
}
```

### Busca de CEP

O pacote inclui funções para busca de CEP utilizando a API gratuita do [ViaCEP](https://viacep.com.br/), sem dependências externas (usa apenas `fetch` nativo do Node.js 18+).

#### Validação de Formato de CEP

Valida o formato de um CEP brasileiro (8 dígitos).

```typescript
import { validarCEP } from '@phdiniiz/brasil-utils';

// Aceita CEP formatado ou apenas números
validarCEP('01001000'); // true
validarCEP('01001-000'); // true
validarCEP('12345'); // false (menos de 8 dígitos)
validarCEP('123456789'); // false (mais de 8 dígitos)
```

#### Busca de CEP

Busca informações de endereço a partir de um CEP.

```typescript
import { buscarCEP } from '@phdiniiz/brasil-utils';

// Busca por CEP
const endereco = await buscarCEP('01001000');

if (endereco) {
  console.log(endereco.logradouro); // "Praça da Sé"
  console.log(endereco.bairro); // "Sé"
  console.log(endereco.localidade); // "São Paulo"
  console.log(endereco.uf); // "SP"
} else {
  console.log('CEP não encontrado');
}

// Retorna null se o CEP não for encontrado ou tiver formato inválido
const endereco2 = await buscarCEP('99999999'); // null
```

#### Busca de CEP por Endereço

Busca CEPs a partir de UF, cidade e logradouro.

```typescript
import { buscarCEPPorEndereco } from '@phdiniiz/brasil-utils';

// Busca por endereço (retorna até 50 resultados)
const ceps = await buscarCEPPorEndereco('SP', 'São Paulo', 'Praça da Sé');

if (ceps.length > 0) {
  ceps.forEach((cep) => {
    console.log(`${cep.cep} - ${cep.logradouro}`);
  });
} else {
  console.log('Nenhum CEP encontrado');
}

// Retorna array vazio se não encontrar resultados ou parâmetros inválidos
const ceps2 = await buscarCEPPorEndereco('RS', 'Porto Alegre', 'Domingos');
```

#### Tipos TypeScript

O pacote exporta tipos TypeScript para facilitar o desenvolvimento:

```typescript
import type { ViaCEPResponse, ViaCEPSearchResponse } from '@phdiniiz/brasil-utils';

const endereco: ViaCEPResponse | null = await buscarCEP('01001000');
const resultados: ViaCEPSearchResponse = await buscarCEPPorEndereco('SP', 'São Paulo', 'Rua');
```

#### Importação Combinada

Você pode importar todas as funções de CEP de uma vez:

```typescript
import {
  validarCEP,
  buscarCEP,
  buscarCEPPorEndereco,
} from '@phdiniiz/brasil-utils';

// Exemplo de uso em formulário
const cep = '01001-000';

if (validarCEP(cep)) {
  const endereco = await buscarCEP(cep);
  if (endereco) {
    console.log(`Endereço: ${endereco.logradouro}, ${endereco.bairro}`);
  }
}
```

#### Tratamento de Erros

Todas as funções de busca tratam erros automaticamente:

```typescript
import { buscarCEP } from '@phdiniiz/brasil-utils';

try {
  const endereco = await buscarCEP('01001000');
  if (endereco) {
    // CEP encontrado
    console.log(endereco);
  } else {
    // CEP não encontrado ou formato inválido
    console.log('CEP inválido ou não encontrado');
  }
} catch (error) {
  // Erro de rede (já tratado internamente, retorna null)
  console.error('Erro ao buscar CEP');
}
```

**Nota**: A API ViaCEP possui rate limiting. Uso massivo para validação de bases de dados pode resultar em bloqueio temporário. Para mais informações, consulte a [documentação oficial do ViaCEP](https://viacep.com.br/).

## Desenvolvimento

### Pré-requisitos

- Node.js >= 24.12.0
- pnpm (recomendado) ou npm/yarn

### Instalar dependências

```bash
pnpm install
```

### Compilar

```bash
pnpm run build
```

### Publicar

```bash
pnpm run prepublishOnly
npm publish --access public
```

## Estrutura

```
brasil-utils/
├── src/
│   ├── index.ts          # Ponto de entrada principal
│   ├── validators/       # Funções de validação
│   │   ├── cpf.ts        # Validação de CPF
│   │   ├── cnpj.ts       # Validação de CNPJ
│   │   ├── phone.ts      # Validação de Telefone e Celular
│   │   ├── index.ts      # Exportações centralizadas
│   │   └── __tests__/    # Testes unitários
│   │       ├── cpf.test.ts
│   │       ├── cnpj.test.ts
│   │       └── phone.test.ts
│   └── cep/              # Funções de CEP
│       ├── validator.ts   # Validação de formato de CEP
│       ├── viacep.ts     # Busca na API ViaCEP
│       ├── types.ts      # Tipos TypeScript
│       ├── index.ts      # Exportações centralizadas
│       └── __tests__/    # Testes unitários
│           ├── validator.test.ts
│           └── viacep.test.ts
├── dist/                 # Build output (gerado)
├── package.json
├── tsconfig.json
└── README.md
```

## Formato dos Dados

### CPF
- **Formato aceito**: Com ou sem formatação (pontos e traços)
- **Exemplo formatado**: `123.456.789-09`
- **Exemplo sem formatação**: `12345678909`
- **Total de dígitos**: 11 (9 dígitos + 2 verificadores)

### CNPJ
- **Formato aceito**: Com ou sem formatação (pontos, barra e traço)
- **Exemplo formatado**: `11.222.333/0001-81`
- **Exemplo sem formatação**: `11222333000181`
- **Total de dígitos**: 14 (12 dígitos + 2 verificadores)

### Telefone Fixo
- **Formato aceito**: Com ou sem formatação (parênteses, espaços, traços)
- **Exemplo formatado**: `(11) 3456-7890`
- **Exemplo sem formatação**: `1134567890`
- **Total de dígitos**: 10 (2 DDD + 8 número)
- **DDD válido**: 11 a 99
- **Primeiro dígito do número**: Não pode ser 0 ou 1

### Celular
- **Formato aceito**: Com ou sem formatação (parênteses, espaços, traços)
- **Exemplo formatado**: `(11) 91234-5678`
- **Exemplo sem formatação**: `11912345678`
- **Total de dígitos**: 11 (2 DDD + 9 número)
- **DDD válido**: 11 a 99
- **Primeiro dígito do número**: Deve ser 9

### CEP
- **Formato aceito**: Com ou sem formatação (traços)
- **Exemplo formatado**: `01001-000`
- **Exemplo sem formatação**: `01001000`
- **Total de dígitos**: 8
- **API utilizada**: [ViaCEP](https://viacep.com.br/) (gratuita, sem autenticação)
- **Requisitos**: Node.js 18+ (para suporte nativo ao `fetch`)

## Licença

MIT

