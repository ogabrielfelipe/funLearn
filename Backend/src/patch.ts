// eslint-disable-next-line @typescript-eslint/ban-ts-comment      <-- Necessary for my ESLint setup
// @ts-ignore: Unreachable code error                              <-- BigInt does not have `toJSON` method


//  Convert o valor de BigInt em string, utilizado para retornar o resuldado da persistência no bando de dados


BigInt.prototype.toJSON=function(){
    return this.toString()
}


//Convert a data para o TimeZone do Brasil 

Date.prototype.toJSON=function(){
    return this.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
    })
}