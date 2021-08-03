// import { expect } from 'chai';
import { expect } from 'chai';
import { describe, it } from 'mocha';
// import { Pessoa, PessoaFisica, PessoaJuridica } from '../src/pessoa';
import Usuario from '../src/model/Usuario';
import buildUsuario from '../src/controller/usuarioBuilder';

describe("Módulo 'Usuário'", (): void => {
  it('Função geradora de usuário fuciona corretamente', (): void => {
    const usuario = buildUsuario(
      'josesilva',
      'Jose',
      'Silva',
      'http://placekitten.com/200/300',
      'programmer',
      'josesilva@email.com',
      'm'
    );

    expect(usuario).to.be.instanceOf(Usuario);
  });

  it('Função geradora de usuário valida os dados corretamente', (): void => {
    expect((): void => {
      buildUsuario(
        'jose silva', // username invalido
        'Jose',
        'Silva',
        'http://placekitten.com/200/300',
        'programmer',
        'josesilva@email.com',
        'm'
      );
    }).to.throw();

    expect((): void => {
      buildUsuario(
        'josesilva',
        'Jose2', // name invalido
        'Silva',
        'http://placekitten.com/200/300',
        'programmer',
        'josesilva@email.com',
        'm'
      );
    }).to.throw();

    expect((): void => {
      buildUsuario(
        'josesilva',
        'Jose',
        'Silva2', // lastname invalido
        'http://placekitten.com/200/300',
        'programmer',
        'josesilva@email.com',
        'm'
      );
    }).to.throw();

    expect((): void => {
      buildUsuario(
        'josesilva',
        'Jose',
        'Silva',
        'http://placekitten.com/200/300',
        'bio com espaço na string lol', // bio inválida
        'josesilva@email.com',
        'm'
      );
    }).to.throw();

    expect((): void => {
      buildUsuario(
        'josesilva',
        'Jose',
        'Silva',
        'http://placekitten.com/200/300',
        'bio com espaço na string lol',
        'josesilva ~ESPAÇO~ @email.com', // email inválido
        'm'
      );
    }).to.throw();

    expect((): void => {
      buildUsuario(
        'josesilva',
        'Jose',
        'Silva',
        'http://placekitten.com/200/300',
        'bio com espaço na string lol',
        'josesilva@email.com',
        'ASDF' // gender invalido
      );
    }).to.throw();
  });
});

// describe('Módulo "Pessoa"', (): void => {
//   it('"PessoaFisica" implementa "Pessoa" com sucesso', (): void => {
//     const pessoa: Pessoa = new PessoaFisica(1, 'José', 'Silva', '07929909433');
//     const info: string = pessoa.getInfo();

//     expect(info)
//       .to.be.equal.a('string')
//       .and.to.be.equal.equal('PessoaFisica{id=1,nome=José,sobrenome=Silva,cpf=07929909433}');
//   });

//   it('"PessoaJuridica" implementa "Pessoa" com sucesso', (): void => {
//     const pessoa: Pessoa = new PessoaJuridica(1, 'José', 'Silva', '11112222333344', 'José LTDA');
//     const info: string = pessoa.getInfo();

//     expect(info)
//       .to.be.equal.a('string')
//       .and.to.be.equal.equal(
//         'PessoaJuridica{id=1,nome=José,sobrenome=Silva,cnpj=11112222333344,razaoSocial=José LTDA}'
//       );
//   });
// });
