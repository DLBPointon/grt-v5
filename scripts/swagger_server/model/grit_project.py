from .base import Base, db


class gritdb(Base):
    __tablename__ = "GritData"
    sample_id = db.Column(db.Integer, primary_key=True)
    latin = db.Column(db.String())
    prefix_sl = db.Column(db.String())
    prefix_dl = db.Column(db.String())
    prefix_fn = db.Column(db.String())
    family_name = db.Column(db.String())
    jira_key = db.Column(db.String())
    project_type = db.Column(db.String())
    length_before = db.Column(db.Integer())
    length_after = db.Column(db.Integer())
    length_change = db.Column(db.Integer())
    scaff_n50_before = db.Column(db.Integer())
    scaff_n50_after = db.Column(db.Integer())
    scaff_n50_change = db.Column(db.Integer())
    scaff_count_before = db.Column(db.Integer())
    scaff_count_after = db.Column(db.Integer())
    scaff_count_change = db.Column(db.Integer())
    chromosome_assignments = db.Column(db.String())
    assignment = db.Column(db.Integer())
    date_in_YMD = db.Column(db.String())
    manual_interventions = db.Column(db.Integer())

    def to_dict(cls):
        return {'sample_id': cls.sample_id,
                'latin': cls.latin,
                'prefix_sl': cls.prefix_sl,
                'prefix_dl': cls.prefix_dl,
                'prefix_fn': cls.prefix_fn,
                'family_name': cls.family_name,
                'jira_key': cls.jira_key,
                'project_type': cls.project_type,
                'length_before': cls.length_before,
                'length_after': cls.length_after,
                'length_change': cls.length_change,
                'scaff_n50_before': cls.scaff_n50_before,
                'scaff_n50_after': cls.scaff_n50_after,
                'scaff_n50_change': cls.scaff_n50_change,
                'scaff_count_before': cls.scaff_count_before,
                'scaff_count_after': cls.scaff_count_after,
                'scaff_count_change': cls.scaff_count_change,
                'chromosome_assignments': cls.chromosome_assignments,
                'assignment': cls.assignment,
                'date_in_YMD': cls.date_in_YMD,
                'manual_interventions': cls.manual_interventions
                }