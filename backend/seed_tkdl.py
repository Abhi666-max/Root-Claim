import os
import time
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# We only need 50 realistic Indian TKDL patents to show in the UI and allow for testing.
TKDL_PATENTS = [
    {"title": "Use of turmeric in wound healing", "content": "A method of promoting healing of a wound in a patient, which consists essentially of administering a wound-healing agent consisting of an effective amount of turmeric powder to said patient."},
    {"title": "Method for controlling fungi on plants by the aid of a hydrophobic extracted neem oil", "content": "A fungicidal composition comprising a fungicidally effective amount of a hydrophobic extracted neem oil."},
    {"title": "Traditional use of Ashwagandha for Stress and Insomnia", "content": "The roots of Withania somnifera (Ashwagandha) are traditionally boiled with milk and consumed to reduce stress, anxiety, and treat severe insomnia. It acts as an adaptogen and rejuvenator (Rasayana)."},
    {"title": "Tulsi (Holy Basil) for Respiratory Afflictions", "content": "Ocimum sanctum (Tulsi) leaves are extracted as a decoction and mixed with honey to treat cough, cold, and respiratory tract infections due to its strong antimicrobial and expectorant properties."},
    {"title": "Section 3(p) of the Indian Patents Act, 1970", "content": "Section 3(p) of the Indian Patents Act states that an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not patentable."},
    {"title": "Use of Ginger (Zingiber officinale) for Nausea and Digestion", "content": "Ginger rhizomes are crushed and consumed with honey or warm water to treat nausea, vomiting, indigestion, and common cold symptoms."},
    {"title": "Aloe Vera (Ghrita Kumari) for Skin Burns and Inflammations", "content": "The gel extracted from Aloe vera leaves is applied topically to soothe and heal skin burns, sunburns, and various inflammatory skin conditions."},
    {"title": "Amla (Phyllanthus emblica) as a Vitamin C source and Rejuvenator", "content": "Amla fruits are consumed fresh or as a dried powder to boost immunity, improve digestion, and act as a potent antioxidant and anti-aging rasayana."},
    {"title": "Brahmi (Bacopa monnieri) for Cognitive Enhancement", "content": "Brahmi leaves and extracts are traditionally used to enhance memory, improve concentration, and reduce anxiety and stress."},
    {"title": "Shatavari (Asparagus racemosus) for Female Reproductive Health", "content": "Shatavari roots are used as a tonic to support the female reproductive system, promote lactation, and balance hormones."},
    {"title": "Guggul (Commiphora wightii) for Cholesterol Management", "content": "Guggul resin is utilized in Ayurveda for its lipid-lowering properties, helping to manage cholesterol levels and support joint health."},
    {"title": "Triphala (Three Fruits) for Digestive Health and Detoxification", "content": "A combination of Amla, Haritaki, and Bibhitaki is used as a mild laxative, digestive tonic, and detoxifying agent."},
    {"title": "Haritaki (Terminalia chebula) for Digestive Disorders", "content": "Haritaki is considered the 'king of medicines' in Ayurveda and is used to treat a wide range of gastrointestinal issues, including constipation and indigestion."},
    {"title": "Bibhitaki (Terminalia bellirica) for Respiratory Health", "content": "Bibhitaki is traditionally used to manage respiratory conditions such as asthma, coughs, and sore throat."},
    {"title": "Giloy (Tinospora cordifolia) for Immunity and Fever", "content": "Giloy stem extracts are widely used as an immunomodulator and antipyretic to treat chronic fevers and recurrent infections."},
    {"title": "Arjuna (Terminalia arjuna) for Cardiovascular Health", "content": "The bark of the Arjuna tree is used as a cardioprotective tonic to manage high blood pressure, angina, and heart failure."},
    {"title": "Shilajit (Asphaltum punjabianum) for Energy and Vitality", "content": "Shilajit, a mineral pitch, is consumed to enhance physical strength, stamina, and overall vitality, acting as a potent rejuvenator."},
    {"title": "Kutki (Picrorhiza kurroa) for Liver Health", "content": "Kutki roots are used in Ayurvedic medicine as a hepatoprotective agent to treat liver disorders, including jaundice and hepatitis."},
    {"title": "Punarnava (Boerhavia diffusa) for Kidney and Urinary Health", "content": "Punarnava is utilized as a diuretic and anti-inflammatory agent to manage edema, urinary tract infections, and kidney disorders."},
    {"title": "Manjistha (Rubia cordifolia) for Blood Purification and Skin Health", "content": "Manjistha roots are used to purify the blood, improve circulation, and treat various skin conditions like acne and eczema."},
    {"title": "Bhringraj (Eclipta alba) for Hair Growth and Liver Health", "content": "Bhringraj oil and extracts are applied to promote hair growth, prevent premature graying, and act as a liver tonic."},
    {"title": "Guduchi (Tinospora cordifolia) for Immunomodulation", "content": "Guduchi is celebrated in Ayurveda for its ability to enhance the immune system and protect against various pathogens."},
    {"title": "Kalmegh (Andrographis paniculata) for Liver and Digestive Disorders", "content": "Kalmegh is used for its hepatoprotective and bitter tonic properties, aiding in digestion and liver function."},
    {"title": "Mulethi (Glycyrrhiza glabra) for Respiratory and Digestive Relief", "content": "Licorice root (Mulethi) is used to soothe sore throats, treat coughs, and alleviate digestive issues like ulcers."},
    {"title": "Pippali (Piper longum) for Respiratory and Digestive Health", "content": "Long pepper (Pippali) is utilized to enhance digestion, treat respiratory ailments like asthma, and improve the bioavailability of other herbs."},
    {"title": "Vasaka (Adhatoda vasica) for Cough and Asthma", "content": "Vasaka leaves are used as a bronchodilator and expectorant to treat chronic coughs, asthma, and bronchitis."},
    {"title": "Kantakari (Solanum xanthocarpum) for Respiratory Conditions", "content": "Kantakari is an important herb for managing cough, asthma, and other respiratory disorders."},
    {"title": "Pushkarmool (Inula racemosa) for Asthma and Heart Disease", "content": "Pushkarmool is used in Ayurveda for its bronchodilator properties and as a cardioprotective agent."},
    {"title": "Rasna (Pluchea lanceolata) for Joint Pain and Inflammation", "content": "Rasna is a primary herb used to manage arthritis, joint pain, and inflammatory conditions."},
    {"title": "Nirgundi (Vitex negundo) for Pain Relief and Inflammation", "content": "Nirgundi leaves and extracts are applied topically or taken internally to relieve pain and reduce inflammation in joints and muscles."},
    {"title": "Shallaki (Boswellia serrata) for Joint Health", "content": "Boswellia (Shallaki) resin is used for its potent anti-inflammatory properties, particularly in managing osteoarthritis and rheumatoid arthritis."},
    {"title": "Eranda (Ricinus communis) for Constipation and Joint Pain", "content": "Castor oil (Eranda) is used as a strong purgative and its leaves/roots are used to manage joint pain and sciatica."},
    {"title": "Dashamoola (Ten Roots) for Inflammation and Pain", "content": "A combination of ten roots used extensively in Ayurveda to treat Vata disorders, including pain, inflammation, and nervous system issues."},
    {"title": "Jatamansi (Nardostachys jatamansi) for Sleep and Nervous System", "content": "Jatamansi is used as a nervine tonic to promote restful sleep, reduce stress, and treat neurological conditions."},
    {"title": "Sarpagandha (Rauvolfia serpentina) for Hypertension", "content": "Sarpagandha roots are traditionally used to manage high blood pressure and as a sedative for nervous disorders."},
    {"title": "Vacha (Acorus calamus) for Cognitive and Speech Disorders", "content": "Sweet flag (Vacha) is used to enhance memory, improve speech, and act as a nervine tonic."},
    {"title": "Jyotishmati (Celastrus paniculatus) for Cognitive Enhancement", "content": "Jyotishmati seeds and oil are used to improve memory, intellect, and manage neurological conditions."},
    {"title": "Krounchabeej (Mucuna pruriens) for Parkinson's and Male Fertility", "content": "Mucuna seeds are a natural source of L-DOPA, used to manage Parkinson's disease and improve male reproductive health."},
    {"title": "Gokshura (Tribulus terrestris) for Urinary and Reproductive Health", "content": "Gokshura is used as a diuretic, to treat kidney stones, and as an aphrodisiac to support male reproductive function."},
    {"title": "Varuna (Crataeva nurvala) for Kidney Stones", "content": "Varuna bark is a primary remedy in Ayurveda for the prevention and treatment of kidney stones and urinary tract infections."},
    {"title": "Pashanabheda (Bergenia ligulata) for Kidney Stones", "content": "Pashanabheda roots are specifically used for their lithotriptic (stone-breaking) properties in managing kidney stones."},
    {"title": "Chitraka (Plumbago zeylanica) for Digestion and Metabolism", "content": "Chitraka is a potent digestive stimulant used to enhance appetite, treat indigestion, and boost metabolism."},
    {"title": "Musta (Cyperus rotundus) for Digestive and Menstrual Disorders", "content": "Musta tubers are used to manage diarrhea, dysentery, indigestion, and regulate menstrual cycles."},
    {"title": "Dadima (Punica granatum) for Digestion and Anemia", "content": "Pomegranate (Dadima) is used as a digestive tonic, astringent for diarrhea, and to manage anemia."},
    {"title": "Bael (Aegle marmelos) for Diarrhea and Dysentery", "content": "Bael fruit, especially when unripe, is highly effective in treating diarrhea, dysentery, and irritable bowel syndrome."},
    {"title": "Khadira (Acacia catechu) for Skin Diseases and Oral Health", "content": "Khadira is a primary herb for treating various skin diseases (Kushtha) and is used in oral care for its astringent properties."},
    {"title": "Bakuchi (Psoralea corylifolia) for Vitiligo and Skin Conditions", "content": "Bakuchi seeds are extensively used in Ayurveda, both topically and internally, for the treatment of vitiligo (leukoderma) and psoriasis."},
    {"title": "Neem (Azadirachta indica) for Blood Purification and Skin Health", "content": "Neem leaves, bark, and oil are used for their strong antibacterial, antifungal, and blood-purifying properties, essential in treating skin infections."},
    {"title": "Daruharidra (Berberis aristata) for Skin, Eye, and Liver Disorders", "content": "Tree turmeric (Daruharidra) is used for its antimicrobial properties to treat skin diseases, eye infections, and liver sluggishness."},
    {"title": "Amalaki (Phyllanthus emblica) for Eye Health and Immunity", "content": "Amalaki is not only a rich source of Vitamin C but is also highly regarded as a tonic for the eyes (Chakshushya) and overall immunity."},
    {"title": "Haridra (Curcuma longa) for Allergies and Inflammation", "content": "Turmeric (Haridra) is used extensively for its anti-allergic, anti-inflammatory, and wound-healing properties."}
]

def main():
    load_dotenv(r"d:\Hackathon Projects\Root-Claim\backend\.env")
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    
    if not url or not key:
        print("Missing SUPABASE_URL or SUPABASE_KEY.")
        return
        
    print(f"Connecting to Supabase at {url}")
    supabase = create_client(url, key)
    
    print("Loading SentenceTransformer model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    print(f"Generating embeddings and inserting {len(TKDL_PATENTS)} TKDL patents...")
    
    for i, item in enumerate(TKDL_PATENTS):
        patent_id = f"TKDL-IND-{1000 + i}"
        embedding = model.encode(item["content"]).tolist()
        
        data = {
            "patent_number": patent_id,
            "title": item["title"],
            "content": item["content"],
            "embedding": embedding
        }
        
        try:
            supabase.table("patents").insert(data).execute()
            print(f"Inserted: {patent_id} - {item['title']}")
        except Exception as e:
            print(f"Failed to insert {patent_id}: {e}")
            
    print("Done seeding TKDL patents!")

if __name__ == "__main__":
    main()
