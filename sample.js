import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const textModel = "meta/Llama-4-Maverick-17B-128E-Instruct-FP8";
const imageModel = "black-forest-labs/FLUX.1-schnell";

// Fonction pour générer une image à partir d'une description
async function generateImage(description, filename) {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
    {
      allowInsecureConnection: true
    }
  );

  console.log(`Génération de l'image: ${filename}...`);
  
  const response = await client.path("/images/generations").post({
    body: {
      prompt: `High quality product photography of ${description}, white background, professional lighting, e-commerce style`,
      model: imageModel,
      size: "1024x1024",
      quality: "standard",
      n: 1
    }
  });

  if (isUnexpected(response)) {
    console.log(`Erreur lors de la génération de ${filename}:`, response.status);
    return null;
  }

  // Sauvegarder l'image générée
  const imageUrl = response.body.data[0].url;
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  
  fs.writeFileSync(path.join(process.cwd(), filename), Buffer.from(imageBuffer));
  console.log(`Image sauvegardée: ${filename}`);
  
  return filename;
}

// Liste des produits avec leurs descriptions
const products = [
  { name: "tent1.jpg", description: "a blue and orange 4-person camping tent for outdoor adventures" },
  { name: "tent2.jpg", description: "a green alpine explorer tent for mountain camping" },
  { name: "tent3.jpg", description: "a lightweight 2-person tent with sky view window" },
  { name: "backpack1.jpg", description: "a large hiking backpack with multiple compartments, outdoor gear" },
  { name: "backpack2.jpg", description: "a summit climber backpack for mountain hiking adventures" },
  { name: "backpack3.jpg", description: "a compact day pack backpack for day hikes" },
  { name: "jacket.jpg", description: "a waterproof hiking jacket for outdoor activities" },
  { name: "pants.jpg", description: "durable hiking pants for trail adventures" },
  { name: "boots.jpg", description: "sturdy hiking boots for mountain trekking" }
];

export async function main() {
  console.log("🚀 Démarrage de la génération des images produits...\n");
  
  // Générer toutes les images des produits
  for (const product of products) {
    try {
      await generateImage(product.description, product.name);
    } catch (error) {
      console.error(`Erreur lors de la génération de ${product.name}:`, error.message);
    }
  }
  
  console.log("\n✅ Génération des images terminée!");
  console.log("📄 Génération du code HTML/CSS basé sur le croquis...\n");

  // Lire l'image et la convertir en base64
  const imagePath = path.join(process.cwd(), "contoso_layout_sketch.jpg");
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString("base64");

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
    {
      allowInsecureConnection: true // Permet d'ignorer les erreurs de certificat auto-signés
    }
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant that can analyze images and generate HTML/CSS code based on visual layouts." 
        },
        { 
          role: "user", 
          content: [
            {
              type: "text",
              text: "Écrit du HTML et du CSS pour une page web basée sur le croquis fait à la main. Utilise les vraies images des produits qui ont été générées: tent1.jpg, tent2.jpg, tent3.jpg, backpack1.jpg, backpack2.jpg, backpack3.jpg, jacket.jpg, pants.jpg, boots.jpg"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      temperature: 0.7,
      top_p: 1.0,
      max_tokens: 2000,
      model: textModel
    }
  });

  if (isUnexpected(response)) {
    console.log("Erreur détectée. Response status:", response.status);
    console.log("Response body:", JSON.stringify(response.body, null, 2));
    throw response.body.error || new Error(`Erreur HTTP ${response.status}: ${response.body}`);
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

