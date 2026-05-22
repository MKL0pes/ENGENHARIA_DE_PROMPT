import os
import shutil

# -------------------------------------------------------
# Missão 01: Automação de Arquivos
# Organiza arquivos de uma pasta em subpastas por extensão
# Bibliotecas usadas: os (manipular caminhos/pastas) e shutil (mover arquivos)
# -------------------------------------------------------

def organizar_pasta(caminho_pasta):
    """
    Recebe o caminho de uma pasta e organiza os arquivos
    dentro dela em subpastas nomeadas pela extensão do arquivo.
    Ex: foto.jpg vai para a pasta 'jpg/'
    """

    # Verifica se a pasta informada realmente existe
    if not os.path.exists(caminho_pasta):
        print(f"[ERRO] A pasta '{caminho_pasta}' não foi encontrada.")
        return

    # Lista todos os itens dentro da pasta
    itens = os.listdir(caminho_pasta)

    arquivos_movidos = 0

    for item in itens:
        caminho_completo = os.path.join(caminho_pasta, item)

        # Ignora subpastas — só processa arquivos
        if os.path.isdir(caminho_completo):
            continue

        # Pega a extensão do arquivo (ex: '.jpg') e remove o ponto
        _, extensao = os.path.splitext(item)
        extensao = extensao.lstrip('.').lower()  # ex: 'jpg', 'pdf', 'txt'

        # Se o arquivo não tem extensão, vai para a pasta 'sem_extensao'
        if not extensao:
            extensao = 'sem_extensao'

        # Cria a subpasta da extensão se ela ainda não existir
        pasta_destino = os.path.join(caminho_pasta, extensao)
        if not os.path.exists(pasta_destino):
            os.makedirs(pasta_destino)
            print(f"[PASTA CRIADA] {pasta_destino}")

        # Move o arquivo para a subpasta correspondente
        destino_arquivo = os.path.join(pasta_destino, item)
        shutil.move(caminho_completo, destino_arquivo)
        print(f"[MOVIDO] '{item}' → '{extensao}/'")
        arquivos_movidos += 1

    print(f"\n✅ Organização concluída! {arquivos_movidos} arquivo(s) movido(s).")


# Ponto de entrada do script
if __name__ == "__main__":
    print("📂 Organizador de Arquivos por Extensão")
    print("-" * 40)
    # Usuário digita o caminho da pasta que quer organizar
    # Exemplo Windows: C:\Users\SeuNome\Downloads
    # Exemplo Mac/Linux: /home/seunome/Downloads
    caminho = input("Digite o caminho completo da pasta a organizar: ").strip()
    organizar_pasta(caminho)
