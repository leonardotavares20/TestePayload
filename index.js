const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const fileInput = form.querySelector('input[type="file"]');

  if (fileInput.files.length === 0) {
    return;
  }

  // for (const entry of formData.entries()) {
  //   console.log(entry[0], entry[1]);
  // }

  testPayload(formData);
});

async function testPayload(formData) {
  console.log(formData);
  try {
    const response = await fetch("http://localhost:3000/api/curriculos", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMsg = (await response.json())?.errors[0]?.message;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error("Fetch error:", e);
  }
}
