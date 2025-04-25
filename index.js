<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Waspam Sender</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f4f4f4;
    }
    input, button {
      padding: 10px;
      margin-top: 10px;
      width: 100%;
      font-size: 16px;
    }
    #output {
      margin-top: 20px;
      white-space: pre-wrap;
      background: #fff;
      padding: 15px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <h1>Waspam Sender</h1>
  <input type="text" id="number" placeholder="Enter phone number" />
  <button onclick="sendWaspam()">Send</button>
  <div id="output"></div>

  <script>
    async function sendWaspam() {
      const number = document.getElementById("number").value;
      const output = document.getElementById("output");
      if (!number) {
        output.textContent = "⚠ Please enter a number.";
        return;
      }

      output.textContent = "✅ Sending...";

      try {
        const encodedNumber = encodeURIComponent(number);
        const response = await fetch(`https://fam-official.serv00.net/sim/famwabomr.php?number=${encodedNumber}`);
        const text = await response.text();

        // Fix broken JSON structure
        const jsonParts = text.split('}{').map((part, index, arr) => {
          return index === 0
            ? part + '}'
            : index === arr.length - 1
            ? '{' + part
            : '{' + part + '}';
        });

        const messages = jsonParts.map(msg => JSON.parse(msg).message).join("\n");
        output.textContent = messages;
      } catch (error) {
        console.error("API Error:", error);
        output.textContent = "⚠ Error fetching data. Try again later.";
      }
    }
  </script>
</body>
</html>
