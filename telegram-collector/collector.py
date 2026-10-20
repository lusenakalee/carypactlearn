import os
import asyncio
from dotenv import load_dotenv
from telethon import TelegramClient

load_dotenv()

API_ID = int(os.environ["TG_API_ID"])
API_HASH = os.environ["TG_API_HASH"]
PHONE = os.environ["TG_PHONE"]

async def main():
    async with TelegramClient(
        "carypact_session",
        API_ID,
        API_HASH,
    ) as client:
        await client.start(phone=PHONE)

        group = await client.get_entity("CaryPact")

        print("Connected to:", getattr(group, "title", "CaryPact"))

        async for message in client.iter_messages(group, limit=10):
            print("-" * 40)
            print("Message ID:", message.id)
            print("Date:", message.date)
            print("Text:", message.text)

            if message.entities:
                for entity in message.entities:
                    if hasattr(entity, "url") and entity.url:
                        print("Link:", entity.url)

asyncio.run(main())