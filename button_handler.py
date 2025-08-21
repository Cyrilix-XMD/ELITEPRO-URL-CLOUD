elif query.data == 'total_users' and user_id == ADMIN_ID:
    total = len(users)
    query.edit_message_text(f"Total registered users: {total}")

elif query.data == 'reset_bonus' and user_id == ADMIN_ID:
    for u in users.values():
        u['daily_bonus'] = False
    query.edit_message_text("Daily bonuses have been reset.")

elif query.data == 'broadcast' and user_id == ADMIN_ID:
    context.user_data['awaiting_broadcast'] = True
    query.edit_message_text("Send the message to broadcast.")