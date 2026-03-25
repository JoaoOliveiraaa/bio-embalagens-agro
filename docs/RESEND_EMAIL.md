# Configuração de E-mails (Resend)

## Variáveis no Vercel (produção com domínio verificado)

**Importante:** Após verificar o domínio no Resend, você deve **remover ou ajustar** as variáveis de teste.

### Configuração correta para produção

No Vercel (Settings → Environment Variables), deixe apenas:

| Variável        | Valor                                                |
|-----------------|------------------------------------------------------|
| `RESEND_API_KEY`| `re_xxxxx` (sua chave)                               |

**Remova** `RESEND_FROM_EMAIL` e `RESEND_TO_EMAIL` se existirem — o código usa os valores padrão (noreply@bioagroembalagens.com.br e contato@bioagroembalagens.com.br).

### Se preferir definir explicitamente

| Variável            | Valor                                                              |
|---------------------|--------------------------------------------------------------------|
| `RESEND_FROM_EMAIL` | `Bio Embalagens Agro <noreply@bioagroembalagens.com.br>`           |
| `RESEND_TO_EMAIL`   | `contato@bioagroembalagens.com.br`                                 |

**Atenção:** O e-mail em `RESEND_FROM_EMAIL` deve usar o domínio verificado no Resend (ex: @bioagroembalagens.com.br).

### Debug de erros

Para ver a mensagem exata do Resend quando der erro, adicione temporariamente:

| Variável             | Valor  |
|----------------------|--------|
| `ENABLE_EMAIL_DEBUG` | `true` |

Faça um novo deploy, envie o formulário e o erro detalhado aparecerá na tela. Depois remova essa variável.

---

## Erro 403: "You can only send testing emails to your own email address"

O remetente `onboarding@resend.dev` só envia para o e-mail do dono da conta. Para enviar para outros destinatários, use um domínio verificado no Resend.

## Para testes (sem domínio verificado)

```env
RESEND_FROM_EMAIL="Bio Embalagens Agro <onboarding@resend.dev>"
RESEND_TO_EMAIL="seu-email@outlook.com"
```
