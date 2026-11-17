from pathlib import Path
from html import escape

root = Path(__file__).resolve().parents[1]
out = ['<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1500" viewBox="0 0 1920 1500">', '<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#526277" stroke-width="1.5"/></marker></defs>', '<rect width="1920" height="1500" fill="#F3F6FA"/>']

def text(x, y, label, size=18, color='#18263A', weight=400):
    out.append(f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(label)}</text>')

def box(x, y, w, h, title, lines=(), tone='white'):
    out.append(f'<g><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{tone}" stroke="#738399"/>')
    text(x+18, y+32, title, 21, weight=600)
    for i, line in enumerate(lines):
        text(x+18, y+63+i*25, line, 16, '#526277')
    out.append('</g>')

def arrow(x, y, a, b, label=''):
    out.append(f'<path d="M{x} {y}L{a} {b}" stroke="#526277" stroke-width="2" fill="none" marker-end="url(#arrow)"/>')
    if label:
        text((x+a)/2+8, (y+b)/2-10, label, 15)

text(60, 70, 'Rent My Tools / UI flow design', 42, weight=600)
text(60, 112, 'Project 2 / Designed journeys, decisions and screen intent / 16 November 2026', 20, '#526277')
text(60, 160, 'Member journey', 28, weight=600)
box(60, 200, 280, 125, 'S03 / Register', ['Name, email, telephone', 'Role + password validation'])
box(410, 200, 280, 125, 'S02 / Log in', ['Credentials to session', 'Return to selected item'])
box(760, 200, 280, 125, 'S01 / Browse', ['Search, category, rate, stock', 'Guest browsing allowed'])
box(1110, 200, 280, 125, 'S04 / Detail', ['Description + stock + rate', 'Member: request equipment'])
box(1460, 200, 370, 125, 'S05 / Request form', ['Equipment, integer quantity, dates', 'Visible summary + estimate'])
for x in [340, 690, 1040, 1390]:
    arrow(x, 260, x+70, 260)
box(1460, 410, 370, 155, 'Validation decision', ['Quantity 1..min(3, current stock)', 'Start >= today UTC; return >= start', 'Return minus start <= 7 days'], '#FFF7D6')
arrow(1645, 325, 1645, 410)
box(1060, 425, 310, 125, 'Explain and preserve input', ['Specific error + correction', 'No reservation or payment'], '#FFF1F0')
arrow(1460, 480, 1370, 480, 'Invalid')
out.append('<path d="M1215 425V365H1645V325" stroke="#526277" stroke-width="2" fill="none" marker-end="url(#arrow)"/>')
box(1460, 650, 370, 125, 'S07 / Saved request', ['Persisted record + confirmation', 'Stock remains unchanged'])
arrow(1645, 565, 1645, 650, 'Valid: send')
box(1030, 650, 320, 125, 'S06 / My requests', ['Own records only', 'View / edit / delete'])
arrow(1460, 712, 1350, 712)
box(600, 650, 320, 125, 'S08 / Edit request', ['Change item / quantity / dates', 'Reapply same validation rules'])
arrow(1030, 712, 920, 712, 'Edit')
box(170, 650, 320, 125, 'Delete confirmation', ['Keep: return to detail', 'Confirm: delete + refresh'], '#FFF1F0')
arrow(1030, 795, 490, 795, 'Delete')
text(60, 845, 'Permission and recovery branches', 26, weight=600)
box(60, 880, 560, 130, 'Guest selects request', ['Log in with a safe same-origin return target.', 'Expired session: preserve nonsecret draft, then log in.'])
box(680, 880, 560, 130, 'Unavailable or removed equipment', ['Zero stock: detail remains; no new request.', 'History remains; edits require active equipment.'])
box(1300, 880, 530, 130, 'Ownership and failure states', ['Wrong role / other member: forbidden.', 'Network error is not empty data; preserve input.'])
text(60, 1080, 'Admin journey', 28, weight=600)
box(60, 1120, 290, 140, 'S02 / Admin login', ['Verified admin role', 'No member-create action'])
box(420, 1120, 360, 140, 'S12 / All requests', ['Requester context + all-user records', 'S07 view; S08 edit and save', 'Confirm delete and refresh'])
box(850, 1120, 360, 140, 'S10 / Manage equipment', ['Name, category, stock, daily rate', 'S11 add / edit equipment', 'Public catalog reflects changes'])
box(1280, 1120, 550, 140, 'Remove equipment decision', ['Confirm soft removal: hidden from public catalog', 'Existing request history remains readable', 'No invented approval or return-processing status'], '#FFF7D6')
arrow(350, 1180, 420, 1180)
arrow(780, 1180, 850, 1180)
arrow(1210, 1180, 1280, 1180)
text(60, 1340, 'Design intent', 24, weight=600)
text(60, 1380, 'Left-aligned equipment information, visible rates and quantity, one summary, responsive single-column forms.', 20, '#526277')
text(60, 1420, 'Editable flow and decision artifact. Not a collage of finished application screenshots.', 20, '#526277')
out.append('</svg>')
(root/'docs/figma/UI-FLOW-DESIGN.svg').write_text('\n'.join(out), encoding='utf-8')
