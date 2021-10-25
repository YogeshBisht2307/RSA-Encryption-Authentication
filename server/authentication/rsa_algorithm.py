from Crypto import Random
from Crypto.PublicKey import RSA


random_generator = Random.new().read
rsa = RSA.generate(1024, random_generator)

def RSA_private_key():
    return rsa.exportKey()

def RSA_public_key():
    return rsa.publickey().exportKey()