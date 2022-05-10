master_dict = {'a': 'Amphibia',
            'b': 'Bird',
            'c': 'Non-vascular plants',
            'd': 'Dicotyledons',
            'e': 'Echinoderms',
            'f': 'Fish',
            'g': 'Fungi',
            'h': 'Platyhelminths',
            'i': 'Insects',
            'j': 'Jellyfish and Cnidaria',
            'k': 'Other Chordates',
            'l': 'Monocotyledons',
            'm': 'Mammal',
            'n': 'Nematodes',
            'o': 'Sponges',
            'p': 'Protists',
            'q': 'Other Arthropods',
            'r': 'Reptile',
            's': 'Shark',
            't': 'Other Animal Phyla',
            'u': 'Algae',
            'v': 'Other Vascular Plants',
            'w': 'Annelids',
            'x': 'Molluscs',
            'y': 'Bacteria',
            'z': 'Archae'
            }

dl_dict = {
    'a': 'Amphibia',
    'b': 'Aves',
    'ca': 'Andreaeopsida', 'cb': 'Bryopsida', 'ch': 'Haplomitriopsida', 'cj': 'Jungermanniopsida',
    'cm': 'Marchantiopsida', 'cn': 'Anthocerotopsida', 'cs': 'Sphagnopsida', 'da': 'Solanales',
    'dc': 'Caryophyllales', 'dd': 'Malvales', 'dh': 'Fagales', 'dm': 'Ranunculales', 'dr': 'Zygophyllales',
    'ea': 'Asteroidea', 'ec': 'Crinoidea', 'ee': 'Echinoidea', 'eh': 'Holothuroidea',
    'eo': 'Ophiuroidea',
    'f': 'Actinopterygii',
    'ga': 'unspecified_class_Ascomycota',
    'gb': 'unspecified_class_Basidiomycota', 'gc': 'Neocallimastigomycetes', 'gd': 'Dothideomycetes',
    'gf': 'Tremellomycetes', 'gg': 'Glomeromycetes', 'gk': 'Tritirachiomycetes', 'gl': 'Lichinomycetes',
    'gm': 'Microsporea', 'go': 'unspecified_class_Oomycota', 'gp': 'Pezizomycetes',
    'gr': 'Sordariomycetes', 'gs': 'Saccharomycetes', 'gt': 'Taphrinomycetes', 'gu': 'Ustilaginomycetes',
    'gx': 'unspecified_phylum_Fungi', 'gy': 'Leotiomycetes', 'gz': 'unspecified_class_Zygomycota',
    'hc': 'Catenulida', 'he': 'Cestoda', 'hm': 'Monogenea', 'hr': 'Rhabditophora', 'ht': 'Trematoda',
    'ia': 'Archaeognatha', 'ib': 'Blattodea', 'ic': 'Coleoptera', 'id': 'Diptera', 'ie': 'Ephemeroptera',
    'if': 'Phasmida', 'ig': 'Dermaptera', 'ih': 'Hemiptera', 'ii': 'Trichoptera', 'ij': 'Mecoptera',
    'ik': 'Megaloptera', 'il': 'Lepidoptera', 'im': 'Mantodea', 'in': 'Neuroptera', 'io': 'Odonata',
    'ip': 'Plecoptera', 'iq': 'Orthoptera', 'ir': 'Raphidioptera', 'is': 'Siphonaptera', 'it': 'Thysanoptera',
    'iu': 'Psocodea', 'iv': 'Strepsiptera', 'iy': 'Hymenoptera', 'iz': 'Zygentoma', 'ja': 'Anthozoa',
    'jh': 'Hydrozoa', 'jn': 'Nuda', 'jr': 'Staurozoa', 'js': 'Scyphozoa', 'jt': 'Tentaculata', 'ka': 'Ascidiacea',
    'kc': 'Cephalaspidomorphi', 'kd': 'Appendicularia', 'ke': 'Enteropneusta', 'kl': 'Leptocardii',
    'km': 'Myxini', 'kp': 'Pterobranchia', 'kt': 'Thaliacea', 'la': 'Alismatales', 'lc': 'Commelinales',
    'ld': 'Dioscoreales', 'll': 'Liliales', 'lp': 'Poales', 'lr': 'Arecales', 'ls': 'Asparagales',
    'lz': 'Zingiberales',
    'm': 'Mammalia',
    'na': 'Aphelenchida', 'nd': 'Desmodorida', 'ne': 'Enoplida',
    'nf': 'unspecified_order_Adenophorea', 'ng': 'Strongylida', 'nh': 'Monhysterida', 'ni': 'Araeolaimida',
    'nl': 'Dorylaimida', 'nm': 'Mermithida', 'nn': 'Mononchida', 'no': 'Desmoscolecida', 'np': 'Diplogasterida',
    'nr': 'Rhabditida', 'ns': 'Spirurida', 'nt': 'Trichocephalida', 'nu': 'unspecified_class_Nematoda',
    'nw': 'Triplonchida', 'ny': 'Tylenchida', 'oc': 'Calcarea', 'od': 'Demospongiae', 'oh': 'Hexactinellida',
    'oo': 'Homoscleromorpha', 'pa': 'Amoebozoa', 'pb': 'Bigyra', 'pc': 'Cercozoa', 'pe': 'Euglenozoa',
    'pf': 'Foraminifera', 'ph': 'Phoronida', 'pi': 'Ciliophora', 'pk': 'Choanozoa', 'pm': 'Mycetozoa',
    'pp': 'Percolozoa', 'pr': 'Rotifera', 'ps': 'Sarcomastigophora', 'pu': 'unspecified_phylum_Protozoa',
    'px': 'Apicomplexa', 'py': 'Myzozoa', 'qb': 'Branchiopoda', 'qc': 'Chilopoda', 'qd': 'Diplopoda',
    'qe': 'Entognatha', 'qh': 'Hexanauplia', 'qm': 'Malacostraca', 'qo': 'Ostracoda', 'qp': 'Pauropoda',
    'qq': 'Arachnida', 'qs': 'Symphyla', 'qu': 'unspecified_class_Arthropoda', 'qx': 'Maxillopoda', 'qy': 'Pycnogonida',
    'r': 'Reptilia', 'se': 'Elasmobranchii', 'sh': 'Holocephali', 'ta': 'Acanthocephala',
    'tb': 'Brachiopoda', 'tc': 'Cephalorhyncha', 'td': 'Dicyemida', 'te': 'Entoprocta', 'tf': 'Nematomorpha',
    'tg': 'Gastrotricha', 'th': 'Chaetognatha', 'tm': 'Gnathostomulida', 'tn': 'Nemertea',
    'to': 'Orthonectida', 'ts': 'Sipuncula', 'tt': 'Tardigrada', 'tu': 'unspecified_phylum_Animalia',
    'tx': 'Xenacoelomorpha', 'ty': 'Cycliophora', 'tz': 'Bryozoa', 'uc': 'Chlorophyta', 'ug': 'Glaucophyta',
    'uh': 'Haptophyta', 'uk': 'Charophyta', 'uo': 'Ochrophyta', 'ur': 'Rhodophyta', 'uy': 'Cryptophyta',
    've': 'Equisetopsida', 'vg': 'Ginkgoopsida', 'vl': 'Lycopodiopsida', 'vo': 'Polypodiopsida',
    'vp': 'Pinopsida', 'vs': 'Psilotopsida', 'wa': 'Amphinomida', 'wb': 'Branchiobdellida', 'wc': 'Crassiclitellata',
    'wd': 'Spionida', 'we': 'Echiuroidea', 'wh': 'Haplotaxida', 'wj': 'Eunicida',
    'wk': 'Arhynchobdellida', 'wl': 'Lumbriculida', 'wn': 'Enchytraeida', 'wo': 'Opisthopora', 'wp': 'Phyllodocida',
    'wr': 'Rhynchobdellida', 'ws': 'Sabellida', 'wt': 'Terebellida', 'wu': 'unspecified_order_Polychaeta',
    'xa': 'Caudofoveata', 'xb': 'Bivalvia', 'xc': 'Cephalopoda', 'xg': 'Gastropoda', 'xm': 'Monoplacophora',
    'xo': 'Solenogastres', 'xp': 'Polyplacophora', 'xs': 'Scaphopoda', 'ya': 'Actinobacteria',
    'yc': 'Cyanobacteria', 'yp': 'Proteobacteria',
    'z': 'Archaea'}
