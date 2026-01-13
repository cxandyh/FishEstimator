Wireframe (Mobile-First)

Screen: Estimate

+--------------------------------------------------+
| Fish Weight Estimator                            |
| [offline status dot]                             |
+--------------------------------------------------+
| Species                                          |
| [ Select species ▼ ]                             |
|  - Kingfish                                      |
|  - Snapper                                       |
|  - ...                                           |
+--------------------------------------------------+
| Length (cm)                                      |
| [  ____ ]                                        |
| (tip: measure from nose to tail fork)            |
+--------------------------------------------------+
| [ Estimate ]                                     |
+--------------------------------------------------+
| Results                                          |
| Average:   8.4 kg  / 18.5 lb                      |
| Unhealthy: 7.6 kg  / 16.8 lb                      |
| Healthy:   9.2 kg  / 20.3 lb                      |
+--------------------------------------------------+
| Threshold                                       |
| Snapper >20 lb  [Below]                          |
| Kingfish >20 kg [Above/Below]                    |
+--------------------------------------------------+
| [New estimate]                                   |
+--------------------------------------------------+

Notes
- If species has no threshold, hide the Threshold section.
- Show inline validation if length is outside min/max bounds.
- Use large tap targets and high-contrast text for outdoor use.

Screen: Species List (Optional)

+--------------------------------------------------+
| Select Species                                   |
+--------------------------------------------------+
| Search... [_____________]                        |
| Kingfish                                         |
| Snapper                                          |
| Kahawai                                          |
| ...                                              |
+--------------------------------------------------+
| [Back]                                           |
+--------------------------------------------------+
