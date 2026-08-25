import os
import hashlib
import json
from web3 import Web3
import logging

# Initialize Web3
polygon_rpc: str = os.getenv("POLYGON_RPC_URL")
if polygon_rpc:
    try:
        w3 = Web3(Web3.HTTPProvider(polygon_rpc))
    except Exception as e:
        logging.warning(f"Web3 initialization failed: {str(e)}")
        w3 = None
else:
    w3 = None

def generate_claim_hash(claim_data: dict) -> str:
    """Generates a SHA-256 hash of the claim data to act as cryptographic proof of origin."""
    claim_string = json.dumps(claim_data, sort_keys=True).encode('utf-8')
    return hashlib.sha256(claim_string).hexdigest()

def anchor_to_blockchain(claim_hash: str) -> dict:
    """
    Feature 5: Cryptographic 'Proof-of-Origin' Blockchain Vault
    Anchors the SHA-256 hash onto the Polygon Amoy Testnet.
    """
    # Hackathon Demo Fallback: Since we don't have a private key in .env to sign transactions,
    # we return a simulated transaction hash that looks realistic to show the UI working.
    return {
        "status": "success",
        "message": "Claim hash successfully anchored to blockchain (Simulated).",
        "polygon_tx_hash": f"0x{hashlib.sha256(os.urandom(32)).hexdigest()}",
        "block_number": 5123908,
        "is_simulation": True
    }
