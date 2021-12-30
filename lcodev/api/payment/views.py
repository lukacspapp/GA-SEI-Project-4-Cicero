from django.shortcuts import render, resolve_url
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="f42wfxjpcp4j7k25",
        public_key="249rv6jysj6ggj4p",
        private_key="6fbea2e5ed568a307e7554f386d7fcb8"
    )
)



def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk = id)
        if user.session_token == token:
            return True
        return False    
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, Please login again!'})

    return JsonResponse({'clientToken': gateway.client_token.generate(), 'success': True})  
    

@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, Please login again!'})

    nonce_from_the_user = request.POST['paymentMethodNonce']
    amount_from_the_user = request.POST['amount']

    result = gateway.transaction.sale({
        "amount": amount_from_the_user,
        "payment_method_nonce": nonce_from_the_user,
        "options": {
            "submit_for_settlement": True,
        }
    })

    if result.is_success:
        return JsonResponse({
            'success': result.is_success,
            'transaction': {
                'id': result.transaction.id,
                'amount': result.transaction.amount
                }
            })
    else:
        return JsonResponse({'error': True, 'success': False})        
