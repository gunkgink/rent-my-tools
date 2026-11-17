from pathlib import Path
from html import escape
root=Path(__file__).resolve().parents[1]/'docs/figma/screens'
root.mkdir(parents=True,exist_ok=True)

def make(name,title,mode):
    s=['<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1100" viewBox="0 0 1440 1100">']
    def rect(x,y,w,h,fill='#FFFFFF',stroke='#CFD8E3',radius=8):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>')
    def text(x,y,t,size=18,color='#18263A',bold=False):s.append(f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{600 if bold else 400}" fill="{color}">{escape(t)}</text>')
    def button(x,y,t,w=220):rect(x,y,w,52,'#2446C8','#2446C8',4);text(x+20,y+33,t,17,'#FFFFFF',True)
    def field(x,y,label,value,w=540):text(x,y,label,16,bold=True);rect(x,y+14,w,52,stroke='#738399',radius=4);text(x+16,y+47,value,17,'#526277')
    rect(0,0,1440,1100,radius=0);rect(0,0,1440,80,stroke='#CFD8E3',radius=0);rect(80,22,32,34,'#F2C94C','#F2C94C',3);text(126,47,'Rent My Tools',23,bold=True);text(820,47,'Browse equipment',16);text(1025,47,'Manage equipment' if mode.startswith('admin') else 'My requests',16);text(1245,47,'Admin' if mode.startswith('admin') else 'Alex Student',16)
    text(80,158,title,44,bold=True)
    if mode=='catalog':
        text(80,205,'Good equipment. Short commitments. More possibilities.',20,'#526277')
        field(80,260,'Search equipment','Try camera, projector, notebook...',900);field(1020,260,'Sort by','Name A-Z',340)
        for i,t in enumerate(['All equipment','Camera','Projector','Computer','Sports']):rect(80+i*190,355,170,44,'#18263A' if i==0 else '#FFFFFF');text(96+i*190,383,t,16,'#FFFFFF' if i==0 else '#18263A')
        text(80,435,'8 equipment items',16,'#526277')
        for i,(label,category,rate,stock) in enumerate([('Mirrorless camera kit','Camera','THB 250','5 available'),('Portable projector','Projector','THB 180','2 available'),('Workshop notebook','Computer','THB 300','4 available')]):
            x=80+i*435;rect(x,470,410,300,'#F3F6FA');rect(x+90,550,230,140,'#344E69','#344E69',16);s.append(f'<circle cx="{x+205}" cy="620" r="48" fill="#2446C8"/>');text(x,810,category,15,'#526277');text(x,850,label,26,bold=True);text(x,900,rate+' / item / day',20,bold=True);text(x,935,stock,16,'#166534')
    elif mode=='detail':
        rect(80,220,740,540,'#F3F6FA');rect(240,375,420,240,'#344E69','#344E69',20);s.append('<circle cx="450" cy="495" r="110" fill="#18263A"/><circle cx="450" cy="495" r="78" fill="#2446C8"/>');text(80,810,'Compact camera with a standard lens.',22,'#526277');rect(870,220,490,540);text(902,270,'Camera',16,'#526277');text(902,326,'THB 250 / item / day',30,bold=True);text(902,375,'5 units available',20,'#166534');text(902,450,'Make it part of your project.',25,bold=True);text(902,495,'Up to 3 units, for up to 7 days.',18);button(902,540,'Request equipment',425);text(902,660,'Requests do not reserve equipment.',17,'#526277');text(902,694,'No payment is collected here.',17,'#526277')
    elif mode=='request':
        rect(80,220,760,720);field(112,265,'Equipment','Mirrorless camera kit',696);field(112,365,'Quantity','2',696);field(112,465,'Start date','2026-11-18',328);field(480,465,'Return date','2026-11-20',328);text(112,590,'Rental dates use UTC. Maximum duration 7 days.',18,'#526277');text(112,632,'Same-day rentals are allowed.',18,'#526277');button(112,705,'Send rental request',270);text(420,739,'Cancel',17,'#2446C8');rect(888,220,472,720,'#F3F6FA');text(920,270,'Your request',30,bold=True);text(920,330,'Mirrorless camera kit',24,bold=True);text(920,380,'2 units / THB 250 per item per day',18);text(920,430,'Start: 18 Nov / Return: 20 Nov',18);text(920,500,'Estimated cost',18,'#526277');text(920,553,'THB 1,000',38,bold=True);text(920,625,'Estimate only. No payment collected.',17,'#526277');text(920,705,'Sending a request does not reserve',17);text(920,735,'equipment or reduce available stock.',17)
    else:
        if mode=='admin-equipment':button(1110,115,'Add equipment',250)
        labels=['Equipment','Requester' if mode=='admin-requests' else 'Category' if mode=='admin-equipment' else 'Quantity','Available' if mode=='admin-equipment' else 'Start date','Rate / day' if mode=='admin-equipment' else 'Return date','Actions']
        for x,t in zip([80,520,800,1000,1190],labels):text(x,255,t,16,'#526277',True)
        for i,t in enumerate(['Mirrorless camera kit','Portable projector','Workshop notebook']):
            y=295+i*150;rect(80,y,1280,136,radius=0);text(104,y+45,t,24,bold=True);text(104,y+83,'Camera' if i==0 else 'Projector' if i==1 else 'Computer',16,'#526277');text(520,y+50,'Sam Student' if mode=='admin-requests' else 'Camera' if mode=='admin-equipment' else '2 units',18);text(800,y+50,'5' if mode=='admin-equipment' else '18 Nov 2026',18);text(1000,y+50,'THB 250' if mode=='admin-equipment' else '20 Nov 2026',18);text(1190,y+45,'Edit' if mode=='admin-equipment' else 'View request',17,'#2446C8');text(1190,y+85,'Remove' if mode=='admin-equipment' else 'Edit / Delete',17,'#B42318')
        text(80,855,'Requests are scoped by role and ownership. Confirm destructive actions.',18,'#526277')
    text(80,1040,'Designed screen / editable layout / '+name,16,'#526277')
    s.append('</svg>');(root/(name+'.svg')).write_text('\n'.join(s),encoding='utf-8')

for args in [('S01-Catalog','Browse equipment','catalog'),('S04-Detail','Mirrorless camera kit','detail'),('S05-Request','Request equipment','request'),('S06-My-Requests','My requests','requests'),('S10-Admin-Equipment','Manage equipment','admin-equipment'),('S12-All-Requests','All requests','admin-requests')]:make(*args)
