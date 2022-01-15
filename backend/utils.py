from django.core.mail import send_mail


class Util:
    @staticmethod
    def sent_email(data, email):
        send_mail(data['email_subject'], data['email_body'], 'info@yourhealthcare.com', [email])
