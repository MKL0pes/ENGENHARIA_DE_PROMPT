import datetime

# -------------------------------------------------------
# Missão 03: Sistema de Notificações
# Dispara alertas no console quando condições críticas são atingidas
# O código é modular: cada responsabilidade está em sua própria função
# -------------------------------------------------------

# --- FUNÇÕES DE VERIFICAÇÃO DE CONDIÇÃO ---

def verificar_temperatura(temp):
    """
    Retorna True se a temperatura for crítica (acima de 80°C).
    """
    return temp > 80

def verificar_uso_cpu(uso_cpu):
    """
    Retorna True se o uso de CPU for crítico (acima de 90%).
    """
    return uso_cpu > 90

def verificar_espaco_disco(espaco_livre_gb):
    """
    Retorna True se o espaço livre em disco for crítico (abaixo de 5GB).
    """
    return espaco_livre_gb < 5


# --- FUNÇÃO DE NOTIFICAÇÃO ---

def disparar_alerta(tipo, valor, mensagem):
    """
    Exibe um alerta formatado no console.
    Em um sistema real, aqui poderia ser enviado um e-mail ou SMS.
    """
    horario = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    print(f"🚨 [{horario}] ALERTA — {tipo}")
    print(f"   Valor atual : {valor}")
    print(f"   Mensagem    : {mensagem}")
    print(f"   [E-MAIL SIMULADO] Notificação enviada para admin@sistema.com\n")

def status_ok(tipo, valor):
    """
    Exibe uma mensagem de status normal no console.
    """
    print(f"✅ {tipo}: {valor} — Normal.\n")


# --- FUNÇÃO PRINCIPAL DE MONITORAMENTO ---

def monitorar_sistema(temperatura, uso_cpu, espaco_disco_gb):
    """
    Recebe os dados do sistema e verifica cada condição.
    Dispara alertas apenas quando uma condição crítica for detectada.
    """
    print("📊 Iniciando monitoramento do sistema...\n")
    algum_alerta = False

    # Verifica temperatura
    if verificar_temperatura(temperatura):
        disparar_alerta(
            tipo="Temperatura",
            valor=f"{temperatura}°C",
            mensagem="Temperatura crítica! Risco de superaquecimento."
        )
        algum_alerta = True
    else:
        status_ok("Temperatura", f"{temperatura}°C")

    # Verifica uso de CPU
    if verificar_uso_cpu(uso_cpu):
        disparar_alerta(
            tipo="Uso de CPU",
            valor=f"{uso_cpu}%",
            mensagem="CPU sobrecarregada! Verifique os processos em execução."
        )
        algum_alerta = True
    else:
        status_ok("Uso de CPU", f"{uso_cpu}%")

    # Verifica espaço em disco
    if verificar_espaco_disco(espaco_disco_gb):
        disparar_alerta(
            tipo="Espaço em Disco",
            valor=f"{espaco_disco_gb}GB livres",
            mensagem="Espaço em disco crítico! Libere espaço imediatamente."
        )
        algum_alerta = True
    else:
        status_ok("Espaço em Disco", f"{espaco_disco_gb}GB livres")

    if not algum_alerta:
        print("🟢 Sistema operando normalmente. Nenhum alerta disparado.")


# Ponto de entrada do script
if __name__ == "__main__":
    print("🖥️  Sistema de Monitoramento e Notificações")
    print("-" * 50)

    try:
        temperatura   = float(input("Digite a temperatura atual do sistema (°C): ").strip())
        uso_cpu       = float(input("Digite o uso atual da CPU (%): ").strip())
        espaco_disco  = float(input("Digite o espaço livre em disco (GB): ").strip())
    except ValueError:
        print("[ERRO] Por favor, digite apenas números.")
        exit()

    print()
    monitorar_sistema(temperatura, uso_cpu, espaco_disco)
