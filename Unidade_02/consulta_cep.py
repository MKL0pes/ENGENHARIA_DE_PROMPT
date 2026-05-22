import urllib.request
import json

# -------------------------------------------------------
# Missão 02: Consulta Simples a APIs
# Consulta a API pública ViaCEP e exibe o endereço formatado
# Biblioteca usada: urllib.request (nativa) e json
# -------------------------------------------------------

def consultar_cep(cep):
    """
    Recebe um CEP como string (com ou sem hífen),
    consulta a API ViaCEP e retorna um dicionário com os dados
    ou None em caso de erro.
    """

    # Remove hífen caso o usuário digitou com ele (ex: '70040-010' → '70040010')
    cep_limpo = cep.replace("-", "").strip()

    # Valida se o CEP tem exatamente 8 dígitos numéricos
    if not cep_limpo.isdigit() or len(cep_limpo) != 8:
        print("[ERRO] CEP inválido. Use o formato: 70040010 ou 70040-010")
        return None

    url = f"https://viacep.com.br/ws/{cep_limpo}/json/"

    try:
        # Faz a requisição à API com timeout de 5 segundos
        with urllib.request.urlopen(url, timeout=5) as resposta:
            dados_brutos = resposta.read()
            dados = json.loads(dados_brutos)

        # A API retorna {"erro": true} quando o CEP não existe
        if dados.get("erro"):
            print(f"[ERRO] CEP '{cep}' não encontrado na base ViaCEP.")
            return None

        return dados

    except Exception as e:
        # Captura qualquer erro de conexão, timeout, etc.
        print(f"[ERRO DE CONEXÃO] Não foi possível consultar o CEP: {e}")
        return None


def exibir_endereco(dados):
    """
    Recebe o dicionário retornado pela API e
    exibe as informações de forma legível no console.
    """
    print("\n📍 Endereço encontrado:")
    print(f"   Logradouro : {dados.get('logradouro', 'N/A')}")
    print(f"   Bairro     : {dados.get('bairro', 'N/A')}")
    print(f"   Cidade     : {dados.get('localidade', 'N/A')}")
    print(f"   Estado     : {dados.get('uf', 'N/A')}")
    print(f"   CEP        : {dados.get('cep', 'N/A')}")


# Ponto de entrada do script
if __name__ == "__main__":
    print("🔍 Consulta de CEP — ViaCEP")
    print("-" * 40)

    while True:
        cep = input("\nDigite o CEP (somente números, ex: 70040010) ou 'sair' para encerrar: ").strip()

        if cep.lower() == 'sair':
            print("Encerrando. Até mais!")
            break

        resultado = consultar_cep(cep)
        if resultado:
            exibir_endereco(resultado)
