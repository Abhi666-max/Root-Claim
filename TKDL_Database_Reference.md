# Root-Claim TKDL Database Reference

This document contains the official Traditional Knowledge Digital Library (TKDL) and Prior Art examples loaded into the Root-Claim **Supabase Vector Database** for the Hackathon Demo. 

The backend uses `sentence-transformers/all-MiniLM-L6-v2` to convert these texts into 384-dimensional mathematical vectors. When a query is made, it computes **Cosine Similarity** to fetch the closest matching context for the IP-SAKTI RAG Chatbot and the AI Collision Radar.

---

## 1. The 5 Core High-Impact Real-World Patents (Primary Database)

These are the most famous cases of Bio-Piracy attempted on Indian Traditional Knowledge. We intentionally included these so judges can test real-world scenarios.

### 1. Turmeric (Haldi) Wound Healing Patent
* **Patent Number:** `US-5401504`
* **Title:** Use of turmeric in wound healing
* **Content/Claim:** A method of promoting healing of a wound in a patient, which consists essentially of administering a wound-healing agent consisting of an effective amount of turmeric powder to said patient.
* **Significance:** This US patent was famously revoked after the Council of Scientific and Industrial Research (CSIR, India) provided prior art from ancient Ayurvedic texts proving that Indians have used turmeric for wound healing for centuries.

### 2. Neem Extract as Fungicide
* **Patent Number:** `EP-0436257`
* **Title:** Method for controlling fungi on plants by the aid of a hydrophobic extracted neem oil
* **Content/Claim:** A fungicidal composition comprising a fungicidally effective amount of a hydrophobic extracted neem oil.
* **Significance:** The European Patent Office (EPO) granted this patent to a US company. It was heavily opposed by India because Neem has been used as a natural pesticide and fungicide in India for millennia. The patent was eventually restricted/revoked.

### 3. Ashwagandha for Stress
* **Patent Number:** `TKDL-AYU-001`
* **Title:** Traditional use of Ashwagandha for Stress and Insomnia
* **Content/Claim:** The roots of Withania somnifera (Ashwagandha) are traditionally boiled with milk and consumed to reduce stress, anxiety, and treat severe insomnia. It acts as an adaptogen and rejuvenator (Rasayana).
* **Significance:** Prevents international supplement companies from patenting basic Ashwagandha extraction methods for sleep aids.

### 4. Tulsi (Holy Basil) for Cough
* **Patent Number:** `TKDL-AYU-002`
* **Title:** Tulsi (Holy Basil) for Respiratory Afflictions
* **Content/Claim:** Ocimum sanctum (Tulsi) leaves are extracted as a decoction and mixed with honey to treat cough, cold, and respiratory tract infections due to its strong antimicrobial and expectorant properties.
* **Significance:** Protects the common medicinal use of Tulsi from being claimed as a novel formulation by pharma companies.

### 5. Indian Patent Act Section 3(p)
* **Patent Number:** `TKDL-RULE-001`
* **Title:** Section 3(p) of the Indian Patents Act, 1970
* **Content/Claim:** Section 3(p) of the Indian Patents Act states that an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not patentable.
* **Significance:** The core legal rule injected into the RAG model so the chatbot always knows the legal basis for rejecting biopiracy claims in India.

---

## 2. The 50 Synthetic Patents (Volume Database)

In addition to the 5 core real-world cases above, we ran a Python script (`generate_more_patents.py`) to inject **50 Synthetic Patent Formulations** into the Supabase database. 

* **Format:** `US-SYNTH-1001` to `US-SYNTH-1050`
* **Purpose:** To demonstrate that the Vector Database can handle volume and scale, and to simulate a massive global repository of patents (USPTO, EPO) that the AI Collision Radar scans through in real-time.

---

### Is this Database Global or just India?
The Root-Claim system is designed to protect **Indian Traditional Knowledge** from **Global Patents**. 
Therefore, our Vector Database contains a mix of:
1. **Indian TKDL data** (What we are protecting).
2. **Global Patent data (USPTO, EPO)** (The threats we are scanning for). 

When the **AI Collision Radar** runs, it takes an Indian claim and searches globally (via Supabase Vectors) to see if a US or European patent is trying to steal it.
